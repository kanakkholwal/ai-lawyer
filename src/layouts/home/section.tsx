import styled from "styled-components";

export const Section = styled.section`
width: 100%;
padding:2rem 1rem;
max-width:var(--max-home-width);
margin-inline:auto;

.heading{
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    margin-bottom:1rem;
}
.content{
    width:100%;
    padding:1rem 2rem;
    border-radius:20px;
    /* background:#fbfbfb; */
    display:flex;
    align-items:center;
    gap:1rem;
    img{
        width:100%;
        height:auto;
        border-radius:20px;
        filter: drop-shadow(0px 0px 5px 20px rgba(var(--grey-rgb), 0.01));
    }
    .text{
        flex:1 1 50%;
        .description{
            font-size: 1.125rem;
            line-height: 1.75rem;
            font-weight: 400;
            margin-bottom:1rem;
            color: rgba(var(--grey-rgb));
        }
    }
    
}
`;
