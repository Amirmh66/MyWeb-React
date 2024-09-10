import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Main from '../Main/Main';



function AdminLayout() {
  return (
    <>
      <div className='flex h-full'>

        <div className='aside'>
          <Sidebar />
        </div>

        <div className='flex-1'>
          <Header />

          <Main /> 
        </div>
        
      </div>
    </>
  )
}

export default AdminLayout
