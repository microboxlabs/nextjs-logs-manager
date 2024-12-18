export const NextResponse = {
    json: jest.fn((data, { status } = { status: 200 }) => ({
        json: async () => data,
        status,
    })),
};
