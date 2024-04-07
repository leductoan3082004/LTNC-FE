import React from 'react'
import ExpendableButton from './ExpendableButton'
import useOpenController from 'src/hooks/useOpenController';

interface ClassSectionProps {
  class_section: string; // Adjust the type according to your data structure
  index: number;
}

const ClassSection: React.FC<ClassSectionProps> = ({ class_section, index }) => {
  const { isOpen, toggle } = useOpenController({ initialState: false });
  
  return (
    <tbody>
      <tr>
        <td className='button-td'>
          <button
            className='flex items-center bg-transparent text-blue-500 gap-2 border-none cursor-pointer'
            onClick={toggle}
          >
            <ExpendableButton isOpen={isOpen} toggle={toggle} />
            {class_section} : {index}
          </button>
        </td>
        <td>
          <b> </b>
        </td>
        <td>dasdadasa</td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  );
};

export default ClassSection;
