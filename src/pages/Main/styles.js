import styled, {keyframes, css} from 'styled-components';

export const Container = styled.div`
  display: block;
  max-width: 1100px;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,0,0, 0.2);
  padding: 0 15px;
  margin: 80px auto;

  h1{
    font-size: 20px;
    display:flex;
    align-items: center;
    flex-direction:row;
    
    svg{
      margin-right: 10px;
    }

  }



`;


export const Heading = styled.div`
  background: #fff;
  padding: 30px;
  margin: 0 0 30px;
  border-radius: 5px;

  h1 {
    margin: 0 0 20px;
  }

  
`

export const Form = styled.form`
  display:flex;
  flex-direction: row;

  input{
    flex:1;
    border: 1px solid ${props => (props.error ? '#FF0000' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }

`;


export const Content = styled.div`
  background: #fff;
  border-radius: 5px;
  max-width: 600px;
  margin: 0 auto;

  @media(min-width: 992px){
    width: 100%;
    max-width: 700px;
    float: left;
  }
  
  
`

export const Perfil = styled.div`
  max-width: 300px;
  padding: 30px;
  margin: 0 auto;

  figure {
    img {
      max-width: 200px;
      display: table;
      margin: 0 auto;
      border-radius: 99px;
    }
  }

  .info {
    text-align: center;
    padding: 20px 0;

    &__name {
      font-size: 20px;
      text-decoration: none;
      color: #222;
      font-weight: bold;
      margin: 0 0 10px;
      display: block;
    }

    &__bio {
      font-size: 16px;
      font-style: italic;
      font-weight: unset;
      margin: 0 0 20px;
    }

    div {
      text-align: left;
      margin: 0 0 5px;

      span, a {
        font-size: 12px;
        font-weight: bold;
        color: rgba(34, 34, 34, 0.6);
        text-decoration: none;
      }
    }

    &__company, &__location {
      font-size: 12px;
      color: rgba(34, 34, 34, 0.6);
      text-align: left;
      // font-weight: unset;
      margin: 0 0 5px;
    }


  }


`

export const Sidebar = styled.div`
  background: #fff;
  border-radius: 5px;
  margin: 30px auto;
  padding: 30px;
  max-width: 340px;

  h2 {
    font-size: 20px;
    margin: 0 0 10px;
  }

  ul {
    list-style: none;

    li {
      font-size: 14px;
      padding: 5px 0;
    }
  }

  @media (min-width: 992px){
    float: right;
    width: 100%;
    margin: 0;
  }
`

//Criando animcação do botao
const animate = keyframes`
  from{
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background:#0D2636;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;


  &[disabled]{
    cursor: not-allowed;
    opacity: 0.5;
  }


  ${props => props.loading &&
    css`
      svg{
        animation: ${animate} 2s linear infinite;
      }
    `
  }


`;

export const List = styled.ul`
  list-style:none;
  padding: 0 30px 30px;
  max-width: 500px; 
  margin: 0 auto;

  h2 {
    font-size: 20px;
    margin: 0 0 20px;
    display: flex;

    svg {
      margin-right: 5px;
    }
  }

  li{
    padding: 15px 0;
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-between;

    & + li{
      border-top: 1px solid #eee;
    }

    a{
      color:#0D2636;
      text-decoration: none;
    }


  }

`;




