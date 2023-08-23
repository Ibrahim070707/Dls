import React, { useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

const CaseTracking = () => {
  const [data, setData] = useState(customersData);

  const handleISActive = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": "umar",
      "isactive": 1,
      "isinactive": 0
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://6450d8ffe1f6f1bb22a081e9.mockapi.io/api/status/", requestOptions)
      .then(response => response.json())
      .then(result => {
        const newData = data.map(item => {
          if (item.id === result.id) {
            return { ...item, isactive: result.isactive };
          } else {
            return { ...item, inactive: result.isactive };
          }
        });
        setData(newData);
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-gray-200 border rounded-3xl'>
      <Header category="Page" title="Case Tracking" />
      <button onClick={handleISActive} className='bg-red-300 border mb-4 rounded-lg text-sm'>Toggle Status</button>
      <GridComponent
        id="gridcomp"
        dataSource={data}
        allowPaging
        allowSorting
        toolbar={['Delete', 'Add']}
        editSettings={{
          allowDeleting: true,
          allowAdding: true,
          allowEditing: true
        }}
        width="auto"
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}>
              {item.field === 'isactive' && (
                <ColumnDirective
                  headerText="Status"
                  width="100"
                  field="isactive"
                  template={data => data.isactive ? <span className="text-green-500 font-bold">Active</span> : <span className="text-red-500 font-bold">Inactive</span>}
                />
              )}
            </ColumnDirective>
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
}

export default CaseTracking;
