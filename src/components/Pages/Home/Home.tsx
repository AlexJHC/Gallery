import {appApi} from '../../../api/appApi';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setLoading, setUsers} from '../../../store/slice/appSlice';


export default function Home() {

  const dispatch = useDispatch()

  const {data: users, isLoading} = appApi.useFetchAllUsersQuery('')

  useEffect(() => {
    dispatch(setLoading(isLoading))
    users && dispatch(setUsers(users))
  }, [isLoading, users, dispatch])

  return (
    <>
      {/*<div>{`${isLoading}`}</div>*/}
      <ul>
        {/*{users && users.map(user => <div key={user.id}>{user.username}</div>)}*/}
      </ul>
    </>
  )
}