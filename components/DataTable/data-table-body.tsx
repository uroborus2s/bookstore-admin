import { Table } from '@tanstack/react-table';

interface DataTableBodyProps<TData> {
  table: Table<TData>;
    isLoading: boolean;
  error: Error | null;
}

export function DataTableBody<TData>({table,isLoading,error}:DataTableBodyProps<TData>) {
  if (isLoading){
    return (<div className="sk-circle flex justify-center items-center">
      <div className="sk-child sk-circle1"></div>
      <div className="sk-child sk-circle2"></div>
      <div className="sk-child sk-circle3"></div>
      <div className="sk-child sk-circle4"></div>
      <div className="sk-child sk-circle5"></div>
      <div className="sk-child sk-circle6"></div>
      <div className="sk-child sk-circle7"></div>
      <div className="sk-child sk-circle8"></div>
      <div className="sk-child sk-circle9"></div>
      <div className="sk-child sk-circle10"></div>
      <div className="sk-child sk-circle11"></div>
      <div className="sk-child sk-circle12"></div>

    </div>)
  }

}