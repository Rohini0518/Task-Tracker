import { Box, Button } from "@mui/material"

const InfoChips = () => {
  return (
    
    <Box sx={{display:'flex',justifyContent:'space-around',mb:4}}>
<Button variant="contained" color="secondary">
  AllTasks
</Button>
<Button variant="contained" color="secondary">
 Completed
</Button>
<Button variant="contained" color="secondary">
  Pending
</Button></Box>

 )
}

export default InfoChips