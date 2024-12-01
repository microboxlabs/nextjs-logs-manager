'use client'
import {Table, Button, Pagination, Modal} from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import DropZone from '../AdminUpload/UploadFiles';
import Filters from './Filters';
import Cookies from 'js-cookie';


const TableComponent = () => {


    const [openModal, setOpenModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [logs, setLogs] = useState<ILogs[]>([]) 
    const [filteredLogs, setFilteredLogs] = useState<ILogs[]>([]) 
    const [token, setToken] = useState("")



    useEffect(() => {
      // Obtener todos los logs 
      const storedLogs = JSON.parse(localStorage.getItem('logs') || '[]')
      setLogs(storedLogs)
      setFilteredLogs(storedLogs)


      // Obtener y setear la cookie
      const token = Cookies.get("auth-token") || "";
      setToken(token)


      // Conexión en tiempo real con el servidor
      const eventSource = new EventSource('/api/logsInRealTime');

      eventSource.onmessage = () => {
        const updatedLogs = localStorage.getItem('logs');
        if (updatedLogs) {
          setLogs(JSON.parse(updatedLogs));
        }
      };
  
      eventSource.onerror = () => {
        eventSource.close();
      };
  
      return () => {
        eventSource.close();
      };
      
    }, [])


    // Logica para paginación
    const logsPerPage = 7
    const totalPages = Math.ceil(filteredLogs.length / logsPerPage)

    const indexOfLastLog = currentPage * logsPerPage
    const indexOfFirstLog = indexOfLastLog - logsPerPage
    const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog)
                        .sort((a, b) => 
                        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    

    const onPageChange = (page: number) => setCurrentPage(page);



    // Manejar los filtros
    const handleFilter = (filteredLogs: ILogs[]) => {
      setFilteredLogs(filteredLogs); 
    };


  return (
        <div className='overflow-auto'>

    <Modal show={openModal} onClose={() => setOpenModal(false)}> 

    <Modal.Header>Sube tu archivo .txt</Modal.Header>
        <DropZone />
    </Modal>

            <div className='px-4 md:px-0 flex justify-between items-center mb-4'>
                 <h1 className='font-bold'>Logs</h1>
                <Button className={`${token === 'admin' ? "" : "hidden" }`} onClick={() => setOpenModal(true)} size="sm">Agregar logs</Button>
            </div> 

            <Filters logs={logs} onFilter={handleFilter} />     

            <div className='overflow-x-auto'>
    
        <Table hoverable className='overflow-x-auto'>
        <Table.Head className='overflow-x-auto'>
          <Table.HeadCell>Timestamp</Table.HeadCell>
          <Table.HeadCell>Log Level</Table.HeadCell>
          <Table.HeadCell>Service Name</Table.HeadCell>
          <Table.HeadCell>Message</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y overflow-x-auto">
          {
           logs ? (
            
            currentLogs.map((log, index) => (

          <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
             {log.timestamp}
            </Table.Cell>
            <Table.Cell>{log.logLevel}</Table.Cell>
            <Table.Cell>{log.serviceName}</Table.Cell>
            <Table.Cell>{log.message}</Table.Cell>
          </Table.Row>
            ))

            ) : (
              <Table.Row>
                  <Table.Cell colSpan={4}>
                      No hay logs disponibles
                  </Table.Cell>
              </Table.Row>
            )
          }

          </Table.Body>
          

        </Table>
        </div>

          <div className="flex text-xs ml-2.5 md:ml-0 md:text-sm  md:w-full sm:justify-center my-6">
          <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={onPageChange}  />
             </div>

        </div>

  )
}

export default TableComponent
