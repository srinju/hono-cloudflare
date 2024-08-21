import { Hono } from 'hono'

const app = new Hono()

//getting inputs from the user >>

/*
app.post('/', async (c) => { //the c both gives you req and res parameters so we will write only c
  const body = await c.req.json(); //whenever we run a json we need to await the conversion to json
  console.log(body);
  console.log(c.req.header('Authorisation'));
  console.log(c.req.query('param'));

  return c.text("hello hono!!")
})
  */

//creating a middleware in hono >

async function authmiddleware(c : any,next : any) { //notice it is a little different from the syntax of express, in express we used to do all the checks and then do next and here we await the next() after doing the checks 
  if(c.req.header("Authorization")) {
    await next(); //if the authorisation header is present then the thread should jump to the next route that is present 
  } else {
    return c.text("you dont have access!!"); //if auth header not present we return you dont have access !!!
  }
}

app.use(authmiddleware); //we can pass the middleware in every route just like we did back in express but in this code it will run for evry request

app.post('/' , authmiddleware ,async (c) => {
  const body = await c.req.json();

  console.log(body);
  console.log(c.req.header('Authorization'));
  console.log(c.req.query('param'))

  return c.text("hi form hono!!");

})

export default app
