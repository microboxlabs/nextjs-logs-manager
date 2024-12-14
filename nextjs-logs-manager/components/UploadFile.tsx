"use client"
import { useUpload } from '@/hooks/useUpload'

export const UploadFile = () => {
    const { fileContent, handleFileChange, upload } = useUpload()
    return (
        <section className='w-full h-full flex flex-col gap-2'>
            <div>
                <input onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Only .txt files</p>
            </div>
            <div className="w-full p-4 h-[390px] sm:flex-1 overflow-auto border rounded">
                <pre>{JSON.stringify(fileContent, null, 2)}</pre>
            </div>
            <button onClick={upload} type="button" className={`p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-slate-500`} disabled={!fileContent[0] && true}>Upload</button>
        </section>
    )
}
