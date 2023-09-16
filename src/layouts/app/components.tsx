import styled from "styled-components";

export const HeaderWrapper = styled.header`
    width: 100%;
    background-color:rgba(var(--light-rgb),1);
    padding:1rem 1rem 0;
    border-bottom:1px solid rgba(var(--grey-rgb),0.1);
    nav{
        display: flex;
        align-items: center;
        gap:0.5rem;
        width: 100%;
        padding: 8px;


        .logo{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-inline:5px auto;
        gap:0.75rem;
        height:24px;
        img{
            height:60px;
            object-fit:cover;
            width:100%;
            aspect-ratio: 1;
            border-radius: 5px;
            flex: 0 0 60px;
        }
        .text{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            flex: 1 1 auto;
            h1{
                font-size: 20px;
                font-weight: 600;
                color:rgba(var(--dark-rgb),1);
                line-height: 1.75rem;
            }
            h2{
                font-size: 14px;
                font-weight: 500;
                color:rgba(var(--grey-rgb),1);
            }
        }
    }
    }
  
`;

export const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 20px;
    color: currentColor;
    position: relative;
    font-size: 14px;
    width: 100%;
    color: #666;
    line-height: 20px;
    &:hover{
      background:rgba(var(--grey-rgb),0.1);
      cursor: pointer;
      color:rgba(var(--dark-rgb),1);
    }

`;
export const MenuLabel = styled.div`
    display: flex;
    padding: 8px 20px;
    flex-direction: column;
    color: currentColor;
    position: relative;
    font-size: 14px;
    color: #666;
    line-height: 20px;

`;
export const MenuSeperator = styled.hr`
  margin: 12px 20px;
  border-top: 1px solid rgba(var(--grey-rgb),0.1);


`;

export const Menubar = styled.div`
    width: 100%;
    margin-inline:auto;
    max-width:1600px;
    display: flex;
    align-items: center;
    flex-wrap:no-wrap;
    overflow-x:auto;
    scroll-behaviour: smooth;
    transition: all .25s ease;
    flex-grow: 1;
    flex-shrink: 0;
    padding:8px;
    gap:0.25rem;

`;
export const MenubarItem = styled.div`
    position: relative;
    display: inline-block;
    padding: 4px 12px;
    border-radius: 4px;
    color: rgba(var(--grey-rgb),1);
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    transition: all .2s ease-in-out;
    outline: none;
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
    &:hover{
            background: rgba(var(--grey-rgb),.1);
            color: rgba(var(--dark-rgb),1);
    }
`;
export const Main = styled.main`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    max-width: calc( 1200px + calc(2 * 24px ));
    padding-inline:24px;
    padding-block: 24px;
    height:100%;

`
