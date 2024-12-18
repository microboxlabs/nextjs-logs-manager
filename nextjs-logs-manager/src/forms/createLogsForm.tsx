"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button, Textarea, Label, Select, ToggleSwitch } from "flowbite-react";
import { createLog } from "../services/logs.createLog.service";
import { logLevelAndServiceService } from "../services/logs.getLevelsAndService.service";
import Loader from "../components/Loader";
import { useAlert } from "../contexts/AlertContext";
import { LogLevel, Service as ServiceType } from "../types/db.types";

const LogSchema = Yup.object().shape({
    levelId: Yup.number()
        .typeError("Level is required.")
        .moreThan(0, "Please select a valid Level.")
        .required("Level is required."),
    serviceId: Yup.number()
        .typeError("Service is required.")
        .moreThan(0, "Please select a valid Service.")
        .required("Service is required."),
    message: Yup.string()
        .min(10, "Message must contain at least 10 characters.")
        .required("Message is required."),
});

const CreateLogsForm: React.FC = () => {
    const { showAlert } = useAlert();
    const [levels, setLevels] = useState<LogLevel[]>([]);
    const [services, setServices] = useState<ServiceType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [createMultiple, setCreateMultiple] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [levelsData, servicesData] = await Promise.all([
                    logLevelAndServiceService.fetchLevels(),
                    logLevelAndServiceService.fetchServices()
                ]);
                setLevels(levelsData);
                setServices(servicesData);
            } catch (error) {
                showAlert("error", "Failed to load dropdown options. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [showAlert]);

    const handleSubmit = async (
        values: { levelId: number; serviceId: number; message: string },
        { setSubmitting, resetForm }: FormikHelpers<{ levelId: number; serviceId: number; message: string }>
    ) => {
        try {
            await createLog(values);
            showAlert("success", "Log created successfully!");

            if (!createMultiple) {
                sessionStorage.setItem(
                    "pendingAlert",
                    JSON.stringify({ type: "success", message: "Log created successfully!" })
                );
                setTimeout(() => {
                    router.push("/dashboard/logs-view");
                }, 2000);
            } else {
                resetForm();
            }
        } catch (error: any) {
            showAlert("error", error.message || "Failed to create log.");
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-8">
                <Loader overlay={true} />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
            <Formik
                initialValues={{ levelId: 0, serviceId: 0, message: "" }}
                validationSchema={LogSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
                    <Form className="space-y-6">
                        {/* Level */}
                        <div>
                            <Label htmlFor="levelId" value="Select Level" />
                            <Select
                                id="levelId"
                                name="levelId"
                                value={values.levelId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                color={errors.levelId && touched.levelId ? "failure" : undefined}
                                className={errors.levelId && touched.levelId ? "border-red-500 focus:ring-red-500" : ""}
                            >
                                <option value={0}>Choose a Level</option>
                                {levels.map((level) => (
                                    <option key={level.id} value={level.id}>
                                        {level.name}
                                    </option>
                                ))}
                            </Select>
                            {errors.levelId && touched.levelId && (
                                <p className="mt-2 text-sm text-red-500">{errors.levelId}</p>
                            )}
                        </div>

                        {/* Service */}
                        <div>
                            <Label htmlFor="serviceId" value="Select Service" />
                            <Select
                                id="serviceId"
                                name="serviceId"
                                value={values.serviceId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                color={errors.serviceId && touched.serviceId ? "failure" : undefined}
                                className={errors.serviceId && touched.serviceId ? "border-red-500 focus:ring-red-500" : ""}
                            >
                                <option value={0}>Choose a Service</option>
                                {services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.name}
                                    </option>
                                ))}
                            </Select>
                            {errors.serviceId && touched.serviceId && (
                                <p className="mt-2 text-sm text-red-500">{errors.serviceId}</p>
                            )}
                        </div>

                        {/* Message */}
                        <div>
                            <Label htmlFor="message" value="Message" />
                            <Textarea
                                id="message"
                                name="message"
                                value={values.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your log message"
                                rows={4}
                                className={`rounded-md border bg-gray-50 p-3 text-gray-900 dark:bg-gray-700 dark:text-white ${errors.message && touched.message
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                    }`}
                            />
                            {errors.message && touched.message && (
                                <p className="mt-2 text-sm text-red-500">{errors.message}</p>
                            )}
                        </div>

                        {/* Toggle to create multiple logs */}
                        <div className="flex items-center justify-between pt-4">
                            <Label htmlFor="createMultiple" value="Create multiple logs?" />
                            <ToggleSwitch
                                id="createMultiple"
                                checked={createMultiple}
                                onChange={(checked) => setCreateMultiple(checked)}
                                className="ml-2"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 text-center">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
                            >
                                {isSubmitting ? "Submitting..." : "Create Log"}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateLogsForm;
