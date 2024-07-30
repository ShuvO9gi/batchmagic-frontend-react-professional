import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import close from '../../../../assets/Logo/actions/cross.svg';
import { useForm } from 'react-hook-form';
import DropDown from '../../../../components/DropDown';
import pdf from '../../../../assets/Logo/actions/pdf.svg';
import pdf_blurred from '../../../../assets/Logo/actions/pdf_blurred.svg';
import pdf_full from '../../../../assets/Logo/actions/pdf_full.svg';
import download_label from '../../../../assets/Logo/actions/download-label.svg';
import delete_label from '../../../../assets/Logo/actions/delete-label.svg';
import close_label from '../../../../assets/Logo/actions/close-label.svg';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import ErrorModal from '../../../../components/ErrorModal';

const Label = ({ onClose, batchTemplateID }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    resetField,
  } = useForm();

  const [labelValue, setLabelValue] = useState(0);
  const [recipeLabels, setRecipeLabels] = useState([]);
  const [recipeLabelTypes, setRecipeLabelTypes] = useState([]);
  const [currentLabel, setCurrentLabel] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const labels = [
    { id: 1, name: 'cu' },
    { id: 2, name: 'sku' },
    { id: 3, name: 'pallet' },
  ];

  /* add label */
  const [base64File, setBase64File] = useState('');
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const controller = new AbortController();
    const getLabels = async () => {
      try {
        const res = await axiosPrivate.get(
          `/batch-template-labels/${batchTemplateID}`,
          {
            signal: controller.signal,
          },
        );
        if (res.status === 200) {
          setRecipeLabels(res?.data?.data?.batch_template_label);
          const label_types = res?.data?.data.map((label) => label.label_type);
          setRecipeLabelTypes(label_types);
          setCurrentLabel(labels.find((l) => !label_types.includes(l.name)));
        }
      } catch (err) {
        <ErrorModal />;
      }
    };

    getLabels();
    return () => {
      controller.abort();
    };
  }, [refetch]);

  const makeData = (data) => {
    return {
      batch_template_id: batchTemplateID,
      label_type: labels.find((l) => l.id === labelValue).name,
      ean_number: data.ean_number,
      file: base64File,
    };
  };

  const handleDelete = async (labelType) => {
    const labelID = recipeLabels.find(
      (label) => label.label_type === labelType,
    ).id;

    if (!labelID) return;
    const controller = new AbortController();
    try {
      const res = await axiosPrivate.delete(
        `/batch-template-label/${labelID}`,
        {
          signal: controller.signal,
        },
      );

      if (res.status === 200) {
        setRefetch(!refetch);
        controller.abort();
      }
    } catch (err) {
      <ErrorModal />;
    }
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
    setRefetch(!refetch);
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
        resetField('file');
        resetField('ean_number');
        resetField('label');
        setBase64File('');
      }
    } catch (err) {
      closeLabel();
      setError(err.response.data.errors);
    }
  };

  return (
    <div className="modal-overlay-recipes">
      <div className="modal-body-recipes modal-body-recipes-label ">
        <div className="d-flex justify-content-between modal-header-recipes list-header">
          <p className="fw-bold fs-6">Label</p>

          <img
            onClick={() => {
              onClose();
            }}
            className="modal-close"
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
                  <th>Product</th>
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
                  <th></th>
                  <td className="text-center">
                    <img
                      src={
                        recipeLabels
                          .map((label) => label.label_type)
                          .includes('cu')
                          ? pdf_full
                          : pdf_blurred
                      }
                      className="cursor-event"
                      onClick={() => {
                        recipeLabelTypes.includes('cu')
                          ? null
                          : setLabelValue(1);
                      }}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </td>
                  <td className="text-center">
                    <img
                      src={
                        recipeLabels
                          .map((label) => label.label_type)
                          .includes('sku')
                          ? pdf_full
                          : pdf_blurred
                      }
                      className="cursor-event"
                      onClick={() => {
                        recipeLabelTypes.includes('sku')
                          ? null
                          : setLabelValue(2);
                      }}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </td>
                  <td className="text-center">
                    <img
                      src={
                        recipeLabels
                          .map((label) => label.label_type)
                          .includes('pallet')
                          ? pdf_full
                          : pdf_blurred
                      }
                      className="cursor-event"
                      onClick={() => {
                        recipeLabelTypes.includes('pallet')
                          ? null
                          : setLabelValue(3);
                      }}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </td>
                </tr>
                {recipeLabelTypes.length > 0 ? (
                  <tr>
                    <td className="text-center">
                      {recipeLabelTypes.includes('cu') ? (
                        <>
                          <a
                            href={
                              recipeLabels?.find(
                                (label) => label.label_type === 'cu',
                              )?.file ?? '#'
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            download={
                              recipeLabels?.find(
                                (label) => label.label_type === 'pallet',
                              )?.file
                                ? 'cu_label'
                                : false
                            }
                          >
                            <img
                              src={download_label}
                              className="cursor-event me-5"
                              alt=""
                            />
                          </a>
                          <img
                            src={delete_label}
                            className="cursor-event"
                            onClick={() => handleDelete('cu')}
                            alt=""
                          />
                        </>
                      ) : null}
                    </td>
                    <td className="text-center">
                      {recipeLabelTypes.includes('sku') ? (
                        <>
                          <a
                            href={
                              recipeLabels?.find(
                                (label) => label.label_type === 'sku',
                              )?.file ?? '#'
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            download={
                              recipeLabels?.find(
                                (label) => label.label_type === 'pallet',
                              )?.file
                                ? 'sku_label'
                                : false
                            }
                          >
                            <img
                              src={download_label}
                              className="cursor-event me-5"
                              alt=""
                            />
                          </a>

                          <img
                            src={delete_label}
                            className="cursor-event"
                            onClick={() => handleDelete('sku')}
                            alt=""
                          />
                        </>
                      ) : null}
                    </td>
                    <td className="text-center">
                      {recipeLabelTypes.includes('pallet') ? (
                        <>
                          <a
                            href={
                              recipeLabels?.find(
                                (label) => label.label_type === 'pallet',
                              )?.file ?? '#'
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            download={
                              recipeLabels?.find(
                                (label) => label.label_type === 'pallet',
                              )?.file
                                ? 'pallet_label'
                                : false
                            }
                          >
                            <img
                              src={download_label}
                              className="cursor-event me-5"
                              alt=""
                            />
                          </a>
                          <img
                            src={delete_label}
                            className="cursor-event"
                            onClick={() => handleDelete('pallet')}
                            alt=""
                          />
                        </>
                      ) : null}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          {currentLabel?.id && (
            <div className="d-flex justify-content-center p-2">
              <button
                type="button"
                className="btn btn-orange float-center create-create-btn"
                onClick={() => setLabelValue(currentLabel?.id)}
              >
                UPLOAD LABELS
              </button>
            </div>
          )}
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
                          dropDownValue={labels}
                          defaultValue={labels.find((l) => l.id === labelValue)}
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
                          placeholder="EAN Number"
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
