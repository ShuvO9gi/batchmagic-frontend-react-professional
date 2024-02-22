import React from 'react';
import PropTypes from 'prop-types';
import close from '../../../../assets/Logo/actions/cross.svg';
import { useForm } from 'react-hook-form';
import DropDown from '../../../../components/DropDown';

const Label = ({ /* isOpen = true, */ onClose, children }) => {
  const { register, handleSubmit } = useForm();

  /* if (!isOpen) {
    return null;
  } */

  const handleAddLabel = () => {
    console.log('Label added');
  };

  return (
    <div className="modal-overlay-recipes">
      <div className="modal-body-recipes modal-body-recipes-label ">
        <div className="d-flex flex-column modal-header-recipes list-header">
          <p className="align-self-start fw-bold fs-6">Add Label</p>

          <img
            onClick={() => {
              /* setStockChanged(true); */

              onClose();
            }}
            className="align-self-end page-close"
            src={close}
            alt=""
          />
        </div>
        <hr className="my-0" />
        <div className="modal-content-recipes">
          {children}
          <form onSubmit={handleSubmit(handleAddLabel)}>
            <div className="row p-2">
              <div className="col-md-12">
                <label
                  htmlFor="label"
                  className="form-label fw-bold text-warning"
                >
                  Label Type
                </label>
                <DropDown
                  isClear={console.log('isClear')}
                  handleDropDown={console.log('handleDropDown')}
                  dropDownValue={console.log('label')}
                  placeholderUpdated="Select Label"
                />
              </div>
              <div className="col-md-12 py-2">
                <label
                  htmlFor="ean_number"
                  className="form-label fw-bold text-warning"
                >
                  EAN Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register('ean_number', {
                    required: 'EAN Number is required',
                  })}
                  id="ean_number"
                />
              </div>
              <div className="col-md-12">
                <label
                  htmlFor="file"
                  className="form-label fw-bold text-warning"
                >
                  PDF File
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  placeholder="Upload File"
                />
              </div>
            </div>
            <div className="d-flex justify-content-center p-4">
              <button
                type="submit"
                className="btn btn-orange float-center create-create-btn"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Label;

Label.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
