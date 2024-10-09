import React, { useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const App = () => {
  const [Question, setQuestion] = useState('');
  const [Output, setOutput] = useState('');
  const [loading, setLoading] = useState(false); 


  const SendToBackend = (e) => {
    e.preventDefault();
    setOutput("")
    setQuestion('');
    setLoading(true);
    axios
      .post(
        '/api/Question',
        {
          Question,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {

        setOutput(res.data.response.candidates[0].content.parts[0].text);      
        setLoading(false); 
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false); 
      });
  };


  const handleCopy = () => {
    if (Output) {
      navigator.clipboard.writeText(Output) 
        .then(() => {
          enqueueSnackbar('Copied to clipboard', {
            autoHideDuration: 1000,
            variant: "default",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            }
          });
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  const textBoxStyle = {
    padding: '0px',
    caretColor: 'white',
    width: '80%',
    backgroundColor: '#000000',
    color: 'white',
    fontSize: "1px",
    scrollbarWidth: 'thin',
    scrollbarColor: '#ff4500 #000', 
  };

  const formStyle = {
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '50px',
  };
  
  const renderers = {
    code: ({ node, inline, className, children, ...props }) => {
      return !inline ? (
        <pre style={{ backgroundColor: '#2d2d2d', padding: '10px', borderRadius: '5px', color: '#f8f8f2' }}>
          <code {...props}>{children}</code>
        </pre>
      ) : (
        <code {...props} style={{ backgroundColor: '#f0f0f0', padding: '2px 4px', borderRadius: '3px', color: '#333' }}>
          {children}
        </code>
      );
    },
    blockquote: ({ node, children }) => (
      <blockquote style={{ borderLeft: '4px solid #ff4500', paddingLeft: '10px', color: '#ccc' }}>
        {children}
      </blockquote>
    ),
  };


  return (
    <>
      <SnackbarProvider />
      <div className="wrapper bg-black w-screen h-screen flex justify-between flex-col items-center">
        <div className="entry flex justify-center items-center">
          <form onSubmit={SendToBackend} style={formStyle}>
            <TextField
              id="outlined-basic"
              label="What do you want to learn about?"
              variant="outlined"
              multiline
              rows={3} 
              style={textBoxStyle}
              className='rounded-2xl'
              InputProps={{
                style: {
                  color: 'white', 
                },
              }}
              InputLabelProps={{
                style: {
                  color: 'gray', 
                },
              }}
              value={Question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </div>

        <div className="output relative flex overflow-y-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#ff4500 #000'
          }}>
          {
            Output && <>
              <Button variant="outlined" className='ml-6 ' onClick={handleCopy} style={{ color: 'gray', border: "none" }}>Copy</Button>
            </>
          }

          <div className="para text-white relative overflow-y-auto p-10"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#ff4500 #000', 
            }}>
            {
              loading ? (
                <Box sx={{ width: 800, fontSize: "30px" }}>
                 <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave"/>
                 <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="pulse"/>
                 <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave"/>
                 <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="pulse"/>
                 <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave"/>
                 <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="pulse"/>
                 <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave"/>
                 <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="pulse"/>
                 <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave"/>
                 <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="pulse"/>
                 <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave"/>
                 <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="pulse"/>
                </Box>
              ) : (
          
                <p className='Para'> {/* Attach the ref to the paragraph element */}
                <ReactMarkdown components={renderers} remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
                  { Output}
                </ReactMarkdown>
                </p>
          
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};
export default App;