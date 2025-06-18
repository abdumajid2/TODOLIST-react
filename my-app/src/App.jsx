import React, { useState } from 'react'
import Button from '@mui/material/Button';
import ol1 from '#/ol1.png'
import ol2 from '#/ol2.png'
import ol3 from '#/ol3.png'
import ol4 from '#/ol4.png'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import './App.css'
import { Icon } from '@mui/material';
import { Add, DeleteOutline, Search } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';

const App = () => {
  const [search, setSearch] = useState('');
  let [users,setUsers] = useState([
   {
    num: '102',
    image: ol1,
    age:'21',
    name: 'Ada Evans',
    email: 'jablav@gmail.com',
    phone: '+1(123) 456 798',
    country: 'St.Pierre & Miqueton',
    status: true,
    id: 1
  },
  {
    num: '103',
    image: ol2,
    age:'41',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+44 20 7946 0958',
    country: 'United Kingdom',
    status: false,
    id: 2
  },
  {
    num: '104',
    image: ol3,
    age:'33',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.es',
    phone: '+34 91 123 4567',
    country: 'Spain',
    status: true,
    id: 3
  },
  {
    num: '105',
    image: ol4,
    age:'28',
    name: 'Chen Wei',
    email: 'chen.wei@example.cn',
    phone: '+86 10 1234 5678',
    country: 'China',
    status: false,
    id: 4
  },
  {
    num: '106',
    image: ol1,
    age:'23',
    name: 'Olga Ivanova',
    email: 'olga.ivanova@example.ru',
    phone: '+7 495 123-45-67',
    country: 'Russia',
    status: true,
    id: 5
  },
  {
    num: '107',
    image: ol1,
    age:'18',
    name: 'Liam O\'Connor',
    email: 'liam.oconnor@example.ie',
    phone: '+353 1 234 5678',
    country: 'Ireland',
    status: false,
    id: 6
  }
  ])


  //add
  let [addDialog,setAddDialog] = useState(false)
  let [addNum,setAddNum] = useState('')
  let [addName,setAddName] = useState('')
  let [addEmail,setAddEmail] = useState('')
  let [addAge,setAddAge] = useState('')
  let [addPhone,setAddPhone] = useState('')
  let [addCountry,setAddCountry] = useState('')
  function addUser() {
   let newUser = {
    num: addNum,
      image: ol1,
      age: addAge,
      name: addName,
      email: addEmail,
      phone: addPhone,
      country: addCountry,
      status: true,
      id: Date.now()
   }
   setUsers([...users,newUser])

  }

  //delete
  function deleteUser (id) {
    users = users.filter((e)=>e.id!=id)
    setUsers(users)
  }

  //edit
  let [editDialog,setEditDialog] = useState(false)
  let [editNum,setEditNum] = useState('')
  let [editName,setEditName] = useState('')
  let [editEmail,setEditEmail] = useState('')
  let [editAge,setEditAge] = useState('')
  let [editPhone,setEditPhone] = useState('')
  let [editCountry,setEditCountry] = useState('')
  let [idx,setIdx] = useState(null)
  function editUser(e) {
    setEditDialog(true)
    setEditNum(e.num),
    setEditName(e.name)
    setEditEmail(e.email)
    setEditAge(e.age)
    setEditPhone(e.phone)
    setEditCountry(e.country)
    setIdx(e.id)
  }
let [statusFilter,setStatusFilter] = useState(false)

//info 
const [infoUser, setInfoUser] = useState(null);
function viewUser(user) {
  setInfoUser(user);
}

  

  function updateUser() {
    const updateUsers = users.map((e)=>{
      if (e.id==idx) {
        return {
          ...e,
          num:editNum,
          name:editName,
          email:editEmail,
          age:editAge,
          phone:editPhone,
          country:editCountry,
        }
      }
      return e
    })
    setUsers(updateUsers)
    setEditDialog(false)
  }
  
  return (
    <>
    <header>

    <section className='flex w-4/5 m-auto mt-4 p-3 rounded-t-lg border-b border-gray-300 bg-gray-200 justify-between'>
        <div className='border p-1'><Search/> <input type="text" value={search} onChange={e => setSearch(e.target.value)} className='overflow-hidden' placeholder='Search...' /></div>
        <div className='flex gap-4'>
          <select
  className='border px-4 rounded-md'
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
>
  <option value="All">All</option>
  <option value="Active">Active</option>
  <option value="Inactive">Inactive</option>
</select>

          <button onClick={()=>setAddDialog(true)} className='border px-4 py-1 rounded-md bg-blue-500 text-white font-semibold'>
            <Add/> Add User
          </button>
        </div>
    </section>
    <table class='w-4/5 m-auto border-collapse bg-white shadow-md rounded-b-lg overflow-hidden'>
  <thead class='bg-gray-200'>
      
    <tr>
      <th class='p-3 text-left text-sm font-semibold text-gray-700'>
        <input type="checkbox" class='form-checkbox h-4 w-4 text-indigo-600 rounded' />
      </th>
      <th class='p-3 text-left text-sm font-semibold text-gray-700'>#</th>
      <th class='p-3 text-left text-sm font-semibold text-gray-700'>User Name</th>
      <th class='p-3 text-left text-sm font-semibold text-gray-700'>Contact</th>
      <th class='p-3 text-left text-sm font-semibold text-gray-700'>Age</th>
      <th class='p-3 text-left text-sm font-semibold text-gray-700'>Country</th>
      <th class='p-3 text-left text-sm font-semibold text-gray-700'>Status</th>
      <th class='p-3 text-left text-sm font-semibold text-gray-700'>Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
  .filter((e) => {
    if (statusFilter === 'All') return true;
    if (statusFilter === 'Active') return e.status === true;
    if (statusFilter === 'Inactive') return e.status === false;
    return true;
  }).map((e) =>
      <tr key={e.id} class='border-b border-gray-200 hover:bg-gray-50'>
        <td class='p-3'>
          <input
             type="checkbox"
              className="w-4 h-4"
              checked={e.status}
               onChange={() => {
               const updated = users.map(user =>
                user.id === e.id ? { ...user, status: !user.status } : user
                );
                setUsers(updated);
                  }}
                    />
        </td>
        <td class='p-3 text-sm text-gray-800'>{e.num}</td>
        <td class='p-3 flex items-center'>
          <img src={e.image} alt={e.name} class='w-8 h-8 rounded-full mr-2 object-cover' />
          <p className='flex flex-col'><span class='text-sm font-medium text-gray-900'>{e.name}</span> <span className='text-gray-400'>{e.email}</span></p>
        </td>
        <td class='p-3 text-sm text-gray-800'>{e.phone}</td>
        <td class='p-3 text-sm text-gray-800'>{e.age}</td>
        <td class='p-3 text-sm text-gray-800'>{e.country}</td>
        <td class='p-3'>
          <span class={`px-2 py-1 rounded-full text-xs font-semibold ${e.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {e.status ? 'Verifed' : 'Rejected'}
          </span>
        </td>
        <td class='p-3 flex gap-3'>
          <button onClick={()=>viewUser(e)}>

          <RemoveRedEyeIcon className='text-gray-600'/>
          </button>
          <button onClick={()=>editUser(e)}>

          <BorderColorIcon className='text-blue-500'/>
          </button>
          <button onClick={()=>deleteUser(e.id)}>
          <DeleteOutline className='text-red-500' />
          </button>
        </td>
      </tr>
    )}
  </tbody>
</table><br /><br />
    {editDialog && (
      <section className='bg-gray-100 shadow-lg p-4 rounded-lg w-2/5 m-auto'>
          <h1 className='text-center font-bold text-2xl text-amber-800 mb-4'>UPDATE USER</h1>
      <div className='flex flex-wrap justify-center gap-2 m-auto max-w-[700px]'>
        <input onChange={(e)=>setEditName(e.target.value)} className='border p-1 border-gray-400'  value={editName} type="text" />
        <input onChange={(e)=>setEditNum(e.target.value)} className='border p-1 border-gray-400' value={editNum} type="text" />
        <input onChange={(e)=>setEditEmail(e.target.value)} className='border p-1 border-gray-400' value={editEmail} type="text" />
        <input onChange={(e)=>setEditAge(e.target.value)} className='border p-1 border-gray-400' value={editAge} type="text" />
        <input onChange={(e)=>setEditPhone(e.target.value)} className='border p-1 border-gray-400' value={editPhone} type="text" />
        <input onChange={(e)=>setEditCountry(e.target.value)} className='border p-1 border-gray-400' value={editCountry} type="text" />
        <div className='flex gap-4'>

        <button onClick={()=>updateUser()}>
        <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
        </button>
      <button onClick={()=>setEditDialog(false)}>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      </button>
        </div>
      </div>
      </section>
    )}
    {
      addDialog && (
        <>
        <section className='bg-gray-100 shadow-lg p-4 rounded-lg w-2/5 m-auto'>

          <h1 className='text-center font-bold text-2xl text-amber-800 mb-4'>ADD USER</h1>
          <div className='flex flex-wrap justify-center gap-2 m-auto max-w-[700px]'>
            <input placeholder='Name...' onChange={(e)=>setAddName(e.target.value)} className='border p-1 border-gray-400' type="text" />
            <input placeholder='Num...' onChange={(e)=>setAddNum(e.target.value)} className='border p-1 border-gray-400' type="text" />
            <input placeholder='Email...' onChange={(e)=>setAddEmail(e.target.value)} className='border p-1 border-gray-400' type="text" />
            <input placeholder='Age...' onChange={(e)=>setAddAge(e.target.value)} className='border p-1 border-gray-400' type="text" />
            <input placeholder='Phone...' onChange={(e)=>setAddPhone(e.target.value)} className='border p-1 border-gray-400' type="text" />
            <input placeholder='Country...' onChange={(e)=>setAddCountry(e.target.value)} className='border p-1 border-gray-400' type="text" />
            <div className='flex gap-4'>
              <button onClick={()=>addUser()}>
                <Button variant="contained" endIcon={<SendIcon />}>
                Send 
                </Button>
                </button>
                 <button onClick={()=>setAddDialog(false)}>
                  <Button variant="contained" disabled>
                    Disabled
                    </Button>
                    </button>
                    </div>
                  </div>
        </section>
                </>
      )}
    </header>
    {infoUser && (
  <div className="p-4 max-w-md mx-auto mt-6 bg-white rounded-lg shadow-lg border">
    <h2 className="text-xl font-bold mb-4 text-blue-800">User Information</h2>
    <div className="flex items-center gap-4 mb-4">
      <img src={infoUser.image} alt={infoUser.name} className="w-16 h-16 rounded-full object-cover" />
      <div>
        <p className="font-semibold text-lg">{infoUser.name}</p>
        <p className="text-gray-500">{infoUser.email}</p>
      </div>
    </div>
    <p><strong>Phone:</strong> {infoUser.phone}</p>
    <p><strong>Age:</strong> {infoUser.age}</p>
    <p><strong>Country:</strong> {infoUser.country}</p>
    <p><strong>Status:</strong> 
      <span className={`ml-2 font-semibold ${infoUser.status ? 'text-green-600' : 'text-red-600'}`}>
        {infoUser.status ? 'Active' : 'Inactive'}
      </span>
    </p>
    <div className="mt-4 text-right">
      <button
        className="px-4 py-1 bg-gray-300 hover:bg-gray-400 text-sm rounded"
        onClick={() => setInfoUser(null)}
      >
        Close
      </button>
    </div>
  </div>
)}

    
    </>
  )
}

export default App