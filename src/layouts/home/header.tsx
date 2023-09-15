import styled from "styled-components";


export const Header = styled.header`
    width: 100%;
    margin-inline:auto;
    padding:1.5rem 0;
    max-width:var(--max-home-width);

`;
export const Nav = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-inline:auto;
    padding:0.75rem 1rem;
    max-width:var(--max-home-width);
    background-color:var(--light);
    border-radius:1rem;
    margin-bottom:2rem;

    .action-btn{
        margin-left:auto;
        display: flex;
        align-items: center;
        justify-content: center;
        gap:0.5rem;
        padding:0.5rem 1rem;
        border-radius:0.5rem;
        transition:all 0.1s ease-in-out;
        font-size: .875rem;
        line-height: 1.25rem;
        color:rgba(var(--light-rgb),1);
        background:rgba(var(--theme-rgb),1);
        &:hover{
            color:rgba(var(--light-rgb),1);
            background:rgba(var(--theme-rgb),0.9)
        }

    }
`;
export const Logo = styled.div`
    display: flex;
    align-items: center;
    margin-right:auto;
    img{
        object-fit: cover;
        max-height:60px;
        margin-top:-10px;
    }
`;
export const Menu = styled.div`
    display: flex;
    align-items: center;
    flex:1 1 0%;
    justify-content: center;
    align-items: center;
    .menulist{
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap:0.5rem;
      
        .item{
            padding:0.5rem 1rem;
            border-radius:0.5rem;
            transition:all 0.3s ease;
            font-size: .875rem;
            line-height: 1.25rem;
            &:hover{
                color:rgba(var(--theme-rgb),0.9);
                background:rgba(var(--theme-rgb),0.1)
            }
        }
        @media (max-width: 768px) {
            display: none;
        }
    }
    
`;
export const Hero = styled.div`
    width: 100%;
    padding:2rem 1rem;
    max-width:var(--max-home-width);
    margin-inline:auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap:wrap;
    gap:1rem;
    &:before{
        content:"";
        position:absolute;
        inset:0;
        margin:auto;
        margin-right:192px;
        width:480px;
        height:480px;
        border-radius:50%;
        background: rgb(210, 255, 247);
        background: radial-gradient(circle, rgb(255, 213, 233) 0%, rgb(190, 243, 234) 100%);
        box-shadow: 0px 0px 20px 0px rgba(var(--dark-rgb),0.1);
        z-index:-1;
        filter: blur(20px);
    }
    &:after{
        content:"";
        position:absolute;
        inset:0;
        margin:auto;
        margin-left:192px;
        margin-top:40px;
        width:480px;
        height:480px;
        border-radius:50%;
        background: rgb(255, 213, 233);
        background: radial-gradient(circle, rgba(var(--theme-rgb),0.1) 0%, rgb(255, 213, 233) 100%);
        box-shadow: 0px 0px 20px 0px rgba(var(--dark-rgb),0.1);
        z-index:-1;
        filter: blur(20px);
    }
    .content{
        flex: 1 1 30%;
        
        .heading{
            font-size: 3.3125rem;
            line-height: 3.5rem;
            font-weight: 700;
            margin-bottom:1rem;
            color:rgba(var(--dark-rgb),1);
            text-transform:uppercase;
            text-align:left;
        }
        .description{
            font-size: 1.125rem;
            line-height: 1.75rem;
            font-weight: 400;
            color: rgba(var(--grey-rgb));
            margin-bottom:1rem;
        }
        .mini-description{
            font-size: 1em;
            line-height: 1.2rem;
            font-weight: 400;
            color: rgba(var(--grey-rgb));
            margin-top:2rem;

        }
        .action{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap:0.5rem;
            margin-block:1rem;
            .action-btn{
                padding:0.5rem 1rem;
                border-radius:0.5rem;
                transition:all 0.1s ease-in-out;
                font-size: 1rem;
                line-height: 1.75rem;
                color:rgba(var(--light-rgb),1);
                background:rgba(var(--theme-rgb),1);
                &:hover{
                    color:rgba(var(--light-rgb),1);
                    background:rgba(var(--theme-rgb),0.9)
                }
                &.dull{
                    color:rgba(var(--theme-rgb),0.8);
                    background:rgba(var(--light-rgb),0.71);
                    &:hover{
                        color:rgba(var(--theme-rgb),0.9);
                        background:rgba(var(--light-rgb),1)
                    }
                }
            }
        }
    }
    .image{
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1 1 auto;
        img{
            object-fit: cover;
            max-width:728px;
            border-radius:1rem;
            width:100%;
            box-shadow: 0px 0px 20px 0px rgba(var(--dark-rgb),0.1);
        }
    }
`;