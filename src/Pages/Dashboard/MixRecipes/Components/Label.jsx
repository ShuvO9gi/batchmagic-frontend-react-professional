import React, { useState } from 'react';
import PropTypes from 'prop-types';
import close from '../../../../assets/Logo/actions/cross.svg';
import { useForm } from 'react-hook-form';
import DropDown from '../../../../components/DropDown';
import pdf from '../../../../assets/Logo/actions/pdf.svg';
import download_label from '../../../../assets/Logo/actions/download-label.svg';
import delete_label from '../../../../assets/Logo/actions/delete-label.svg';
import close_label from '../../../../assets/Logo/actions/close-label.svg';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';

const Label = ({ onClose, batchTemplateID }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    resetField,
  } = useForm();
  const [labelValue, setLabelValue] = useState(0);
  const labels = [
    { id: 1, name: 'cu' },
    { id: 2, name: 'sku' },
    { id: 3, name: 'pallet' },
  ];

  /* add label */
  const [base64File, setBase64File] = useState('');
  const axiosPrivate = useAxiosPrivate();

  const makeData = (data) => {
    return {
      batch_template_id: batchTemplateID,
      label_type: labels.find((l) => l.id === labelValue).name,
      ean_number: data.ean_number,
      file: base64File,
    };
  };

  /* add label */
  const uploadFile = async (e) => {
    const file = e.target.files[0];

    if (file.size > 5000000) {
      setError('file', {
        type: 'manual',
        message: 'File size should be less than 5 MB',
      });
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('file', {
        type: 'manual',
        message: 'Only PDF files are allowed',
      });
      return;
    }

    const base64 = await convertBase64(file);
    setBase64File(base64);
    setError('file', {});
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  /*  */
  const closeLabel = () => {
    setLabelValue(0);
  };

  const handleAddLabel = async (data, e) => {
    const formData = makeData(data);
    const controller = new AbortController();
    e.preventDefault();
    try {
      const res = await axiosPrivate.post(`/batch-template-label`, formData, {
        signal: controller.signal,
      });
      if (res.status === 200) {
        controller.abort();
        closeLabel();
      }
    } catch (err) {
      closeLabel();
      setError(err.response.data.errors);
    }
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
                        setLabelValue(1);
                      }}
                      alt=""
                    />
                  </td>
                  <td className="text-center">
                    <img
                      src={pdf}
                      className="cursor-event"
                      onClick={() => {
                        setLabelValue(2);
                      }}
                      alt=""
                    />
                  </td>
                  <td className="text-center">
                    <img
                      src={pdf}
                      className="cursor-event"
                      onClick={() => {
                        setLabelValue(3);
                      }}
                      alt=""
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-center">
                    <img
                      src={download_label}
                      className="cursor-event me-5"
                      onClick={() => {
                        console.log('Downloaded');
                      }}
                      alt=""
                    />
                    <img
                      src={delete_label}
                      className="cursor-event"
                      onClick={() => {
                        console.log('Deleted');
                      }}
                      alt=""
                    />
                  </td>
                  <td className="text-center">
                    <img
                      src={download_label}
                      className="cursor-event me-5"
                      onClick={() => {
                        console.log('Downloaded');
                      }}
                      alt=""
                    />
                    <img
                      src={delete_label}
                      className="cursor-event"
                      onClick={() => {
                        console.log('Deleted');
                      }}
                      alt=""
                    />
                  </td>
                  <td className="text-center">
                    <img
                      src={download_label}
                      className="cursor-event me-5"
                      onClick={() => {
                        console.log('Downloaded');
                      }}
                      alt=""
                    />
                    <img
                      src={delete_label}
                      className="cursor-event"
                      onClick={() => {
                        console.log('Deleted');
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

          <div className="d-flex justify-content-center p-2">
            <button
              type="submit"
              className="btn btn-orange float-center create-create-btn"
            >
              UPLOAD LABELS
            </button>
          </div>
          {labelValue ? (
            <form onSubmit={handleSubmit(handleAddLabel)}>
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
                          isClear={false}
                          // handleDropDown={handleDropDown}
                          dropDownValue={labels.filter(
                            (l) => l.id === labelValue,
                          )}
                          defaultValue={labels.find((l) => l.id === labelValue)}
                          placeholderUpdated="Select Label"
                          isDisabled={true}
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
                        {errors.ean_number && (
                          <p className="text-danger">
                            {errors.ean_number.message}
                          </p>
                        )}
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
                          {...register('file', {
                            required: 'file is required',
                          })}
                          onChange={(e) => uploadFile(e)}
                          // ref={ref}
                          id="file"
                          placeholder="Upload File"
                        />
                        {errors.file && (
                          <p className="text-danger">{errors?.file?.message}</p>
                        )}
                      </div>
                      {base64File && (
                        <div className="mt-3">
                          <img
                            src={pdf}
                            className="cursor-event"
                            onClick={() => {
                              setLabelValue(true);
                            }}
                            alt=""
                          />
                          <img
                            src={close_label}
                            className="align-top cursor-event"
                            onClick={() => {
                              setBase64File('');
                              resetField('file');
                              setError('file', {
                                type: 'manual',
                                message: 'File is required',
                              });
                            }}
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                    <div className="d-flex justify-content-center p-4">
                      <button
                        type="submit"
                        className="btn btn-orange float-center create-create-btn"
                        // onClick={handleAddLabel}
                        // disabled={!baseImage || errors?.ean_number?.message}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Label;

Label.propTypes = {
  batchTemplateID: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};
