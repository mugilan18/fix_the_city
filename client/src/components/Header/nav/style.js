import styled from 'styled-components/macro';
import { FaUserCircle } from 'react-icons/fa';
import { queries } from 'shared/layout';

export const MainNav = styled.nav`
  margin: 0 auto;
  width: 100%;
  

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    ${[queries.tiny]} {
      justify-content: center;
    }

    div {
      display: flex;
    }
  }
`;

export const NavItem = styled.div`
  color: #f2e4c0;
  margin-right: 5px;
`;

export const NavAvatar = styled(FaUserCircle)`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.gray};
  cursor: pointer;
`;
