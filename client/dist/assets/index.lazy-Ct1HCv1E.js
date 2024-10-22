import{r as t,j as s,u as x,a as p,c as m}from"./index-Dz97SzDh.js";import{c as o}from"./utils-3aVJPru9.js";const n=t.forwardRef(({className:e,...a},r)=>s.jsx("div",{ref:r,className:o("rounded-xl border bg-card text-card-foreground shadow",e),...a}));n.displayName="Card";const d=t.forwardRef(({className:e,...a},r)=>s.jsx("div",{ref:r,className:o("flex flex-col space-y-1.5 p-6",e),...a}));d.displayName="CardHeader";const i=t.forwardRef(({className:e,...a},r)=>s.jsx("h3",{ref:r,className:o("font-semibold leading-none tracking-tight",e),...a}));i.displayName="CardTitle";const c=t.forwardRef(({className:e,...a},r)=>s.jsx("p",{ref:r,className:o("text-sm text-muted-foreground",e),...a}));c.displayName="CardDescription";const l=t.forwardRef(({className:e,...a},r)=>s.jsx("div",{ref:r,className:o("p-6 pt-0",e),...a}));l.displayName="CardContent";const f=t.forwardRef(({className:e,...a},r)=>s.jsx("div",{ref:r,className:o("flex items-center p-6 pt-0",e),...a}));f.displayName="CardFooter";function j(){return x({queryKey:["expenses","total"],queryFn:async()=>{const e=await p.expenses.total.$get(),a=await e.json();return e.ok||Promise.reject(a),a}})}const y=m("/")({component:u});function u(){const{data:e,isLoading:a}=j();return s.jsxs("section",{className:"m-10",children:[s.jsxs("div",{className:"space-x-2",children:[s.jsx("a",{href:"/api/v1/login",children:"login"}),s.jsx("a",{href:"/api/v1/register",children:"register"})]}),s.jsxs(n,{className:"mx-auto w-1/4",children:[s.jsxs(d,{children:[s.jsx(i,{children:"Total Expenses"}),s.jsx(c,{children:"Your monthly total expenses"})]}),s.jsx(l,{children:a?s.jsx("p",{children:"..."}):s.jsx("p",{children:e==null?void 0:e.data})})]})]})}export{y as Route};