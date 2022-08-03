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


  return(
    <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>{name}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {addresses.map((address, index) => (
              <Tr key={index}>
                <Td>{address}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
  )
}

export default TableComponent;