import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective,  Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, ordersGrid } from '../data/dummy';
import { Header } from '../components';

const CaseHistory = () => {
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-gray-200 border rounded-3xl'>
      <Header category="Page" title="TC Case History" />
      <GridComponent 
      id="gridcomp"
      dataSource={ordersData}
      allowPaging
      allowSorting
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />

          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport ]}/>
      </GridComponent>
    </div>
  )
}

export default CaseHistory;
  