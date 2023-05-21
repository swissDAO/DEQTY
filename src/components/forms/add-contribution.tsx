import { Dialog, Transition } from '@headlessui/react';
import { ChangeEvent, Fragment, useState } from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

interface IAddContribution {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddContribution(props: IAddContribution) {
  const { isOpen, onClose } = props;
  const [submitButtonIsDisabled, setsubmitButtonIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  console.log(submitButtonIsDisabled);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        open={isOpen}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"></div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-gray-900"
                    >
                      Share your contribution
                    </Dialog.Title>
                    <div className="mt-3">
                      <p className="text-md text-gray-500">
                        Add your working hours.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <Formik
                    initialValues={{
                      workingHours: '',
                    }}
                    enableReinitialize
                    validationSchema={Yup.object({
                      workingHours: Yup.string()
                        .max(3, 'Must be 3 characters or less')
                        .required('Required'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                      console.log('hello');
                      setIsLoading(true);
                      await new Promise(r => setTimeout(r, 2000));
                      onClose();
                    }}
                  >
                    {({
                      values,
                      handleChange,
                      setFieldValue,
                      errors,
                      touched,
                    }) => (
                      <Form className="flex items-center justify-center">
                        <div className="flex flex-col">
                          <div className="my-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="workingHours"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Working hours
                            </label>
                            <div className="sm:col-span-2 sm:mt-0">
                              <Field
                                onChange={(e: string | ChangeEvent<any>) => {
                                  setsubmitButtonIsDisabled(false);
                                  handleChange(e);
                                }}
                                type="text"
                                name="workingHours"
                                id="workingHours"
                                placeholder={''}
                                className={
                                  'focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 focus:outline-none'
                                }
                              />
                            </div>
                            {touched.workingHours && errors.workingHours && (
                              <div className="text-sm text-red-500">
                                {errors.workingHours}
                              </div>
                            )}
                          </div>

                          {isLoading ? (
                            <button
                              type="submit"
                              className="mt-4 flex items-center rounded-lg bg-black px-4 py-3 text-white"
                              disabled
                            >
                              <svg
                                className="mr-3 h-5 w-5 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <span className="font-medium"> Adding... </span>
                            </button>
                          ) : (
                            <button
                              type="submit"
                              disabled={submitButtonIsDisabled}
                              className={
                                'mt-4 rounded-md bg-black px-4 py-3 text-sm font-bold text-white'
                              }
                            >
                              Add Contribution
                            </button>
                          )}
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
