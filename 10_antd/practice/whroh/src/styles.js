import styled from 'styled-components'

export const StyledContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  min-height: 100vh;
  max-width: 500px;
  padding: 100px 0;
  margin: 0 auto;
`

export const StyledTraitSection = styled.div`
  padding: 40px 0;
  margin: 0 auto;
`

export const StyledBirthTimeSection = styled.div`
  padding: 40px 0;
  margin: 0 auto;

  .timepicker {
    width: 100%;
  }
`
