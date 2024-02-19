import React, { useState } from 'react';
import PropTypes from 'prop-types';
import close from '../../../../assets/Logo/actions/cross.svg';
import { useForm } from 'react-hook-form';
import DropDown from '../../../../components/DropDown';
import pdf from '../../../../assets/Logo/actions/pdf.svg';
import dowanload_label from '../../../../assets/Logo/actions/dowanload-label.svg';
import delete_label from '../../../../assets/Logo/actions/delete-label.svg';
import close_label from '../../../../assets/Logo/actions/close-label.svg';

const Label = ({ /* isOpen = true, */ onClose, children }) => {
  const { register, handleSubmit } = useForm();
  const [openLabel, setOpenLabel] = useState(false);

  /* if (!isOpen) {
    return null;
  } */

  const closeLabel = () => {
    setOpenLabel(false);
  };

  const handleAddLabel = () => {
    console.log('Label added');
  };

  return (
    <div className="modal-overlay-recipes">
      <div className="modal-body-recipes modal-body-recipes-label ">
        <div className="d-flex flex-column modal-header-recipes list-header">
          <p className="align-self-start fw-bold fs-6">Label</p>

          <img
            onClick={() => {
              onClose();
            }}
            className="align-self-end page-close modal-recipes-close"
            src={close}
            alt=""
          />
        </div>
        <hr className="my-0" />
        <div className="modal-content-recipes">
          {children}
          <form onSubmit={handleSubmit(handleAddLabel)}>
            <div className="row p-2">
              <table className="table table-mt">
                <thead>
                  <tr>
                    <th scope="col" className="text-recipe text-center">
                      <b>CU</b>
                    </th>
                    <th scope="col" className="text-recipe text-center">
                      <b>SKU</b>
                    </th>
                    <th scope="col" className="text-recipe text-center">
                      <b>PALLET</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <img
                        src={pdf}
                        className="cursor-event"
                        onClick={() => {
                          setOpenLabel(true);
                        }}
                        alt=""
                      />
                    </td>
                    <td className="text-center">
                      <img
                        src={pdf}
                        className="cursor-event"
                        onClick={() => {
                          setOpenLabel(true);
                        }}
                        alt=""
                      />
                    </td>
                    <td className="text-center">
                      <img
                        src={pdf}
                        className="cursor-event"
                        onClick={() => {
                          setOpenLabel(true);
                        }}
                        alt=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td /* className="d-flex justify-content-between" */>
                      <img
                        src={dowanload_label}
                        className="cursor-event me-5"
                        onClick={() => {
                          setOpenLabel(true);
                        }}
                        alt=""
                      />
                      <img
                        src={delete_label}
                        className="cursor-event"
                        onClick={() => {
                          setOpenLabel(true);
                        }}
                        alt=""
                      />
                    </td>
                    <td>
                      <img
                        src={dowanload_label}
                        className="cursor-event me-5"
                        onClick={() => {
                          setOpenLabel(true);
                        }}
                        alt=""
                      />
                      <img
                        src={delete_label}
                        className="cursor-event"
                        onClick={() => {
                          setOpenLabel(true);
                        }}
                        alt=""
                      />
                    </td>
                    <td>
                      <img
                        src={dowanload_label}
                        className="cursor-event me-5"
                        onClick={() => {
                          setOpenLabel(true);
                        }}
                        alt=""
                      />
                      <img
                        src={delete_label}
                        className="cursor-event"
                        onClick={() => {
                          setOpenLabel(true);
                        }}
                        alt=""
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <div className="d-flex justify-content-between text--center">
                <div className="col-md-4">
                  <label htmlFor="cu" className="form-label fw-bold">
                    CU
                  </label>
                </div>
                <div className="col-md-4">
                  <label htmlFor="sku" className="form-label fw-bold">
                    SKU
                  </label>
                </div>
                <div className="col-md-4">
                  <label htmlFor="pallet" className="form-label fw-bold">
                    PALLET
                  </label>
                </div>
              </div>
              <hr /> */}
            </div>
            {openLabel && (
              <div className="modal-overlay-recipes">
                <div className="modal-body-recipes modal-body-recipes-label ">
                  <div className="d-flex flex-column modal-header-recipes list-header">
                    <p className="align-self-start fw-bold fs-6">Add Label</p>

                    <img
                      onClick={() => {
                        closeLabel();
                      }}
                      className="align-self-end page-close"
                      src={close}
                      alt=""
                    />
                  </div>
                  <hr className="my-0" />
                  <div className="modal-content-recipes">
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
                      <div className="mt-3">
                        <img
                          src={pdf}
                          className="cursor-event"
                          onClick={() => {
                            setOpenLabel(true);
                          }}
                          alt=""
                        />
                        <img
                          src={close_label}
                          className="vertical-top cursor-event"
                          onClick={() => {
                            setOpenLabel(true);
                          }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center p-4">
                      <button
                        type="button"
                        className="btn btn-orange float-center create-create-btn"
                        onClick={handleAddLabel}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="d-flex justify-content-center p-2">
              <button
                type="submit"
                className="btn btn-orange float-center create-create-btn"
              >
                UPLOAD LABELS
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
