import { Button, ButtonGroup } from "@mui/material";

export function CustomPagination({  
  totalPages,  
  page,  
  onChange,  
}) {  
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const handleChange = (number) => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
    onChange(number);
  };
  
  return (  
    <ButtonGroup variant="outlined" aria-label="Basic button group">
      {pageNumbers.map((number) => {  
        const buttonColor = number === page ? "primary" : "inherit";  
        return (  
          <Button  
            key={number}  
            onClick={() => handleChange(number)}
            color={buttonColor}
          >  
            {number}  
          </Button>  
        );  
      })}  
    </ButtonGroup>
  )};

export default CustomPagination;
