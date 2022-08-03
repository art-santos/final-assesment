import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'


const TableComponent = ({name, addresses}) => {
  console.log(name, addresses)

  return(
    <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>{name}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {addresses.map((address, index) => {
              if (address) {
                return (
                  <Tr key={index}>
                    <Td>{address.proposer}</Td>
                  </Tr>
                )
              }else{
                return null
              }
            })}
          </Tbody>
        </Table>
      </TableContainer>
  )
}

export default TableComponent;