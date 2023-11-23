import React, { useEffect, useState } from 'react';

function DisplayData() {
  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
 
  const [viewItemId, setViewItemId] = useState(null);
  const [displayMode, setDisplayMode] = useState('list');
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((res) => res.json())
      .then((fetchedData) => {
        const modifiedData = fetchedData.map(item => ({ ...item, status: 'pending' }));
        setData(modifiedData);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const handleViewDetails = (id) => {
    setViewItemId(id);
    setDisplayMode('details');
    console.log(`View details for item with ID: ${id}`);
  };

  const handleGoBack = () => {
    setDisplayMode('list');
    setViewItemId(null);
  };

  const handleEditData = (id) => {
    setEditItemId(id);
    const itemToEdit = data.find((item) => item.id === id);
    setEditedTitle(itemToEdit.title);
   
    
  };

  const handleUpdateData = () => {
    // Find the item to be updated in the data array
    const updatedData = data.map((item) => {
      if (item.id === editItemId) {
        return {
          ...item,
          title: editedTitle,
        
          // Update other fields accordingly
        };
      }
      return item;
    });

    // Update the data state with the edited values
    setData(updatedData);

    // After updating, reset the edit state
    setEditItemId(null);
    setEditedTitle('');
   
    // Reset other edited fields
  };

  const handleDeleteData = (id) => {
    // Filter out the item with the specified ID
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleAddTitle = () => {
    if (newTitle.trim() !== '') {
      const newId = data.length + 1; // Generate a new ID (replace this logic with your actual ID generation logic)
      const newItem = {
        id: newId,
        title: newTitle,
        status: 'pending', // Set initial status to 'pending' for new items
        // Set other fields for the new item
      };

      const updatedData = [...data, newItem];
      setData(updatedData);
      setNewTitle('');
    }
  };

  const handleChangeStatus = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        // Toggle the status or change as needed
        return {
          ...item,
          status: item.status === 'completed' ? 'pending' : 'completed',
        };
      }
      return item;
    });

    setData(updatedData);
  };

  if (displayMode === 'details') {
    const selectedItem = data.find((item) => item.id === viewItemId);

    return (
      <div>
        <div style={{ margin: "auto", display: "block", width: "40%", height: "auto", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", textAlign: "center" }}>
          <h1>ToDo Details</h1>
          <p>Title: {selectedItem.title}</p>
          {/* Display other details */}
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", display: "block", margin: "auto", textAlign: "center" }}>
      <h1 style={{ marginBottom: "20px" }}>Display ToDo List</h1>

      <div style={{ width: "80%", display: "block", margin: "auto" }}>
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new title"
          />
          <button onClick={handleAddTitle}>Add New Title</button>
        </div>

        <table style={{ display: "block", margin: "auto", textAlign: "center", padding: "0% 0%" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px" }}>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: "10px" }}>{editItemId === item.id ? <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} /> : item.title}</td>
                <td>{item.status}</td>
                <td style={{ padding: "20px" }}>
                  {editItemId === item.id ? (
                    <div>
                      <button onClick={handleUpdateData}>Update</button>
                      <button onClick={() => setEditItemId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => handleViewDetails(item.id)}>View Details</button>
                      <button onClick={() => handleEditData(item.id)}>Edit</button>
                      <button onClick={() => handleDeleteData(item.id)}>Delete</button>
                      <button onClick={() => handleChangeStatus(item.id)}>Change Status</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplayData
