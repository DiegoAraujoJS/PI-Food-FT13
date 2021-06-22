import { render, screen } from '@testing-library/react';
import DishDetail from './components/Form.jsx';



test('', ()=> {
  const { getByRole } = render(<DishDetail title='test' ranking='234' health='10' summary='test summary' analyzedInstructions={[false]}/>)
  let ul = getByRole('listitem')
  console.log(ul.children.length)
  expect(ul.elementType).toEqual('ul')
})


//<DishDetail title={detail['title']} ranking={detail['aggregateLikes']} health={detail['healthScore']} summary={detail['summary']} analyzedInstructions={[false]}/>