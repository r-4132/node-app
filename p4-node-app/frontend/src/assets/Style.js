import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'JosefinSans-SemiBold', Courier, monospace;
  color: #333333;


  button[type="submit"] 
  {
    background-color: #458788;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    padding: 10px 20px;
    margin-left: 10px;
    cursor: pointer;
  }

  button[type="submit"]:hover 
  {
    background-color: #ff6b6b;
  }
  
`;

export const Image = styled.div`
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;

  img 
  {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333333;
  width:70%;
`;
export const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 20px;
  paddiing: 20px;

  
`;

export const BookmarkButton = styled.button`
  font-size: 16px;
  background-color: #c1a35f;
  color: #333333;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 20px;
  cursor: pointer;

  &:hover 
  {
    background-color: #333333;
    color: #c1a35f;
  }
`;



export const Nav = styled.div`
color:white;
display:flex;
// margin: 10px;
background-color:#d54b1a;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);


ul
{
  margin: 10px;
  align-items: center;
  padding: 0;
  list-style: none;
  
}

a
{
  color: #f0ecc9;
  text-decoration: none;
  font-family:'JosefinSans-SemiBold';

  font-weight:bold;

}
`

export const CustomText = styled.div`
font-family:'JosefinSans-SemiBold';
font-size:26px;
`

export const SearchBox = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;

  input[type="text"] 
  {
    padding: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    width: 50%
    outline: none;
  }
  label {
    margin-left: 10px;
  }

  button[type="submit"] 
  {
    background-color: #458788;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    padding: 10px 20px;
    margin-left: 10px;
    cursor: pointer;
  }
  button[type="button"] 
  {
    background-color: #458788;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    padding: 10px 20px;
    margin-left: 10px;
    cursor: pointer;
  }

  button[type="submit"]:hover 
  {
    background-color: #ff6b6b;
  }

  
`;

export const About = styled.div`
line-height: 40px;
`
export const LogoImage = styled.img`
  width: 2rem;
  transform: scale(3);
  margin: 20px 20px 0px;
  // padding: 10px;
`;

export const ContainerTypes = styled.div`
display: flex;  
flex-direction:row;
width: 80%;
font-family: 'JosefinSans-SemiBold', Courier, monospace;
justify-content: center;

`

export const cuisine = styled.div`
margin: 10px;
`
export const DietTypes = styled.div`
margin: 10px;

`