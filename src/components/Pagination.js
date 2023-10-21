import Rreact,{ useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

function Pagination() {
  const{page,setPage}=useContext(AppContext)
  return (
    <div>
    <button onClick={() => setPage(page - 1)} disabled={page === 1}>
      Previous
    </button>
    <button onClick={() => setPage(page + 1)}>Next</button>
  </div>
  )
}

export default Pagination
