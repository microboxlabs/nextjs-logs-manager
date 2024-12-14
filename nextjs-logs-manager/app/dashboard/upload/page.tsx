import { UploadFile } from "@/components/UploadFile";

export const metadata = {
    title: 'Upload File',
    description: 'Easily upload text files to the database for processing.',
};

export default function UploadPage() {
    return (
        <main className="flex flex-col gap-4 h-full">
            <header>
                <h1 className="text-3xl">Upload File</h1>
            </header>
            <UploadFile />
        </main>
    );
}