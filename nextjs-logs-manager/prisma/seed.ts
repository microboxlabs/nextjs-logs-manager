import prisma from "@/src/lib/db";
import generateHash from "@/src/lib/generateHash";

async function main() {
    // Seed Roles
    const roles = [
        { name: 'ADMIN' },
        { name: 'REGULAR' },
    ];
    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: role,
        });
    }

    // Seed LogLevels
    const logLevels = [
        { name: 'INFO' },
        { name: 'WARNING' },
        { name: 'ERROR' },
    ];
    for (const logLevel of logLevels) {
        await prisma.logLevel.upsert({
            where: { name: logLevel.name },
            update: {},
            create: logLevel,
        });
    }

    // Seed Services
    const services = [
        { name: 'Service-A' },
        { name: 'Service-B' },
        { name: 'Service-C' },
        { name: 'Service-D' },
        { name: 'Service-E' },
    ];
    for (const service of services) {
        await prisma.service.upsert({
            where: { name: service.name },
            update: {},
            create: service,
        });
    }

    // Seed Permissions
    const permissions = [
        { name: 'UPLOAD_LOGS' },
        { name: 'VIEW_LOGS' },
        { name: 'FILTER_LOGS' },
        { name: 'MANAGE_ENTRIES' },
    ];
    for (const permission of permissions) {
        await prisma.permission.upsert({
            where: { name: permission.name },
            update: {},
            create: permission,
        });
    }

    // Get Roles
    const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } });
    const regularRole = await prisma.role.findUnique({ where: { name: 'REGULAR' } });

    // Create users
    if (adminRole && regularRole) {
        const adminPasswordHash = await generateHash('admin123');
        const userPasswordHash = await generateHash('user123');

        await prisma.user.upsert({
            where: { email: 'admin@example.com' },
            update: {},
            create: {
                email: 'admin@example.com',
                passwordHash: adminPasswordHash,
                roleId: adminRole.id,
            },
        });

        await prisma.user.upsert({
            where: { email: 'user@example.com' },
            update: {},
            create: {
                email: 'user@example.com',
                passwordHash: userPasswordHash,
                roleId: regularRole.id,
            },
        });
    }

    // Assign Permissions to Roles
    const allPermissions = await prisma.permission.findMany();
    const permissionMap = Object.fromEntries(allPermissions.map((p) => [p.name, p.id]));

    if (adminRole) {
        const adminPermissions = ['UPLOAD_LOGS', 'VIEW_LOGS', 'FILTER_LOGS', 'MANAGE_ENTRIES'];
        for (const perm of adminPermissions) {
            await prisma.rolePermission.upsert({
                where: { roleId_permissionId: { roleId: adminRole.id, permissionId: permissionMap[perm] } },
                update: {},
                create: { roleId: adminRole.id, permissionId: permissionMap[perm] },
            });
        }
    }

    if (regularRole) {
        const regularPermissions = ['VIEW_LOGS', 'FILTER_LOGS'];
        for (const perm of regularPermissions) {
            await prisma.rolePermission.upsert({
                where: { roleId_permissionId: { roleId: regularRole.id, permissionId: permissionMap[perm] } },
                update: {},
                create: { roleId: regularRole.id, permissionId: permissionMap[perm] },
            });
        }
    }

    // Create Test Logs
    const allLogLevels = await prisma.logLevel.findMany();
    const logLevelMap = Object.fromEntries(allLogLevels.map((l) => [l.name, l.id]));

    const allServices = await prisma.service.findMany();
    const serviceMap = Object.fromEntries(allServices.map((s) => [s.name, s.id]));

    const logs = [
        {
            timestamp: new Date('2024-12-01T10:00:00Z'),
            levelId: logLevelMap['INFO'],
            serviceId: serviceMap['Service-A'],
            message: 'Successfully completed task.',
        },
        {
            timestamp: new Date('2024-12-01T10:01:00Z'),
            levelId: logLevelMap['ERROR'],
            serviceId: serviceMap['Service-B'],
            message: 'Failed to connect to the database.',
        },
        {
            timestamp: new Date('2024-12-01T10:02:00Z'),
            levelId: logLevelMap['WARNING'],
            serviceId: serviceMap['Service-C'],
            message: 'Response time is slow.',
        },
        {
            timestamp: new Date('2024-12-02T15:00:00Z'),
            levelId: logLevelMap['INFO'],
            serviceId: serviceMap['Service-D'],
            message: 'Scheduled maintenance completed.',
        },
        {
            timestamp: new Date('2024-12-02T15:30:00Z'),
            levelId: logLevelMap['ERROR'],
            serviceId: serviceMap['Service-E'],
            message: 'Unexpected shutdown detected.',
        },
    ];

    for (const log of logs) {
        await prisma.logEntry.create({
            data: log,
        });
    }

    console.log('Seed completed successfully!');
    console.log('seed data:', { roles, logLevels, services, permissions, logs });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

