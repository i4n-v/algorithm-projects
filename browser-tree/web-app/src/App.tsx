import { Box } from '@mui/material'
import ColorChangingText from './components/ColorChanging'
import Input from './components/Input'
import { FormProvider, useForm } from 'react-hook-form'
import SiteResult from './components/SiteResult'
import { useState } from 'react'
import { useMutation } from 'react-query'
import api from './axios'

function App() {
  const form = useForm({
    defaultValues: {
      search: ""
    }
  })
  const [sites, setSites] = useState<any[]>([])
  const mutation = useMutation({
    mutationKey: "submitMutation",
    mutationFn: (params: any) => {
      const data = api.get('sites', { params })
      return data
    }
  })

  const handleSubmit = form.handleSubmit((values) => {
    if (!values.search) return
    mutation.mutate(values, {
      onSuccess: (data) => {
        setSites((curr) => data.data);
        form.resetField("search");
      },
      onError: (data) => {
        setSites((curr) => []);
      },
    })
  })
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && form.getValues('search')) {
      handleSubmit()
    }
  };


  return (
    <Box sx={{ display: 'grid', gridAutoRows: sites.length ? '80px 70px auto' : '1fr 1fr', gridAutoColumns: "1fr", minHeight: "90vh", justifyContent: "center", padding: "10% 20%", flexDirection: "column", rowGap: "50px" }} >
      <Box sx={{ display: "flex", alignItems: "flex-end", columnGap: "30px", justifyContent: "center" }}>
        <Box sx={{ fontSize: "4em", border: "solid 2px #1971c2", color: "#1971c2", borderRadius: "15px", padding: "10px 40px" }} >
          {"/"}
        </Box>
        <ColorChangingText text="BAR_" color='#1971c2' fontSize='5em' />
      </Box>
      <Box sx={{ width: "100%" }}>
        <FormProvider {...form}>
          <Input onKeyDown={handleKeyDown} shrink={false} name='search' placeholder={"Search..."} sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: "white",
              borderRadius: "13px",
              '& fieldset': {
                borderColor: 'white',
                borderWidth: "2px",
              },
            },
          }} icon={{
            right: <Box onClick={() => handleSubmit()} sx={{ fontSize: "25px", border: "solid 3px #1971c2", color: "#1971c2", borderRadius: "10px", padding: "5px 13px", cursor: "pointer" }} >
              {"/"}
            </Box>
          }} />
        </FormProvider>
      </Box>
      {sites.length ? <Box sx={{
        display: "flex", alignItems: "start", flexDirection: "column", rowGap: "30px",
        overflowX: "hidden",
        overflowY: "clip"
      }}>
        {sites.map((site: any, index: number) => <SiteResult key={site.id} index={index} {...site} />)}
      </Box> : null
      }
    </Box >
  )
}

export default App
