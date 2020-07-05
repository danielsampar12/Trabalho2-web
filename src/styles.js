//Daniel Garcia Sampar e Rodrigo Zimmerman

import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div` 
    width: 100%;
    max-width: 400px;
    margin: 30px;
    background: #FFFF;
    border-radius: 4px;
    padding: 20px;
    display: flex;
    justify-content: center;
    bottom: 100px;
`;

export const Table = styled.table`
    width: 100%;
    text-align: center;
    margin: 20px;
    background: #FFFF;
    border-radius: 4px;
    th, td{
        padding: 0 5px;
        button{
                padding: 0 10px;
                border: 0;
                background: transparent;
                color: #cc4141;
                margin-left: 5px;
                cursor: pointer;
            }
    }
    img{
        width: 50px;
    }
    tr:hover {background-color: #ddd;}
    tr:nth-child(even){background-color: #f2f2f2;}
`;

export const Form = styled.form`
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    background: #FFF;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
    border-radius: 2px;
    padding: 30px 20px;
    label{
        margin-top: 10px;
        color: rgb(78, 78, 78);
        font-size: 14px;
        font-weight: bold;
        display: block;
    }
    input.string{
        width: 75%;
        height: 32px;
        font-size: 14px;
        color: #666;
    }
    input.number{
        width: 50%;
        height: 32px;
        font-size: 14px;
        color: #666;
    }
    select{
        width: 50%;
        height: 32px;
        font-size: 14px;
        color: #666;
    }
    button{
        width: 90%;
        border: 0;
        
        margin-top: 30px;
        background: #0683bd;
        border-radius: 2px;
        padding: 15px 20px;
        font-size: 16px;
        font-weight: bold;
        color: #FFF;
        cursor: pointer;
        transition: background 0.5s;
    }
    
    div.buttons{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`;

export const Strong = styled.strong`
    font-size: 20px
`;
