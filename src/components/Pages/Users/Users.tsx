import {useDispatch} from 'react-redux';
import {usersApi} from '../../../api/usersApi';
import {useEffect} from 'react';
import {setLoading} from '../../../store/slice/appSlice';
import Grid from '@mui/material/Grid';
import AreaCard from '../../features/AreaCard';

export default function Users() {

  const dispatch = useDispatch()

  const {data, isLoading} = usersApi.useFetchAllUsersQuery(2)
  const {pageUsersTotalCount, usersResponse} = {...data}

  useEffect(() => {
    console.log(usersResponse)
    dispatch(setLoading(isLoading))
  }, [dispatch, isLoading, usersResponse])

  return (
    <Grid
      container
      spacing={{xs: 4, md: 6}}
      justifyContent="center"
      alignItems="center"
      paddingTop={6}
      paddingBottom={6}>
      {usersResponse && usersResponse.map(user => (
        <Grid item key={user.id}>
          <AreaCard
            name={user.name}
            username={user.username}
            companyName={user.company.name}
            website={user.website}
            phone={user.phone}
            email={user.email}
          />
        </Grid>
      ))}
    </Grid>
  )
}