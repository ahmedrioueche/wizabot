import React, { useState, ChangeEvent, FormEvent, memo, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { dict } from '../../utils/dict';
import { Plus, X, User as UserIcon, Phone, MessageSquare, Upload } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/Alert';
import FileUploader from '../ui/FileUploader';
import useScreen from '../../hooks/useScreen';
interface FormData {
  name: string;
  whatsappNumber: string;
  whatsappBusinessId: string;
  businessName: string;
  email: string;
  password: string;
  whatsappAPIToken: string;
  whatsappPhoneNumber: string;
  whatsappPhoneId: string;
  openaiAPI: string;
  retrievalToolName: string;
  retrievalToolDescription: string;
  prompt: string;
}

interface FormErrors {
  name?: string;
  whatsappNumber?: string;
  whatsappBusinessId?: string;
  businessName?: string;
  email?: string;
  password?: string;
  whatsappAPIToken?: string;
  whatsappPhoneNumber?: string;
  whatsappPhoneId?: string;
  openaiAPI?: string;
  retrievalToolName?: string;
  retrievalToolDescription?: string;
  prompt?: string;
}

const AddUser: React.FC = () => {
  const language = useLanguage();
  const text = dict[language];
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const { isSmallScreen, isMidScreen } = useScreen();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    whatsappNumber: '',
    whatsappBusinessId: '',
    businessName: '',
    email: '',
    password: '',
    whatsappAPIToken: '',
    whatsappPhoneNumber: '',
    whatsappPhoneId: '',
    openaiAPI: '',
    retrievalToolName: '',
    retrievalToolDescription: '',
    prompt: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fields = [
    {
      name: 'businessName',
      label: 'Business Name',
      placeholder: 'User full name',
      icon: <UserIcon className="h-4 w-4" />,
    },
    { name: 'email', label: 'Email', placeholder: 'User email', icon: <UserIcon className="h-4 w-4" /> },
    { name: 'password', label: 'Password', placeholder: 'User password', icon: <UserIcon className="h-4 w-4" /> },
    {
      name: 'whatsappAPIToken',
      label: 'Whatsapp API Token',
      placeholder: 'EAAOVZXXX...',
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      name: 'whatsappBusinessId',
      label: 'Whatsapp Business ID',
      placeholder: '363XXX...',
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      name: 'whatsappPhoneNumber',
      label: 'Whatsapp Phone Number',
      placeholder: '21378XXX...',
      icon: <Phone className="h-4 w-4" />,
    },
    {
      name: 'whatsappPhoneId',
      label: 'Whatsapp Phone ID',
      placeholder: '740XXX...',
      icon: <Phone className="h-4 w-4" />,
    },
    {
      name: 'openaiAPI',
      label: 'OpenAI API',
      placeholder: 'sk-svXXX ...',
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      name: 'retrievalToolName',
      label: 'Retrieval Tool Name',
      placeholder: 'French Cheese',
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      name: 'retrievalToolDescription',
      label: 'Retrieval Tool Description',
      placeholder: 'An E-commerce website that ...',
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      name: 'prompt',
      label: 'Prompt',
      placeholder: 'Act as a customer service agent for a French Cheese E-commerce website ...',
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = text.nameRequired || 'Name is required';
    }

    if (!formData.whatsappNumber?.trim()) {
      newErrors.whatsappNumber = text.whatsappRequired || 'WhatsApp number is required';
    } else if (!/^\+?\d{10,}$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = text.invalidWhatsapp || 'Invalid WhatsApp number';
    }

    if (!formData.whatsappBusinessId?.trim()) {
      newErrors.whatsappBusinessId = text.businessIdRequired || 'Business ID is required';
    }

    fields.forEach(({ name }) => {
      console.log({ name });
      if (!formData[name as keyof FormData]?.trim()) {
        newErrors[name as keyof FormErrors] = `${name.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleReset = (): void => {
    const resetData: FormData = fields.reduce((acc, field) => {
      acc[field.name as keyof FormData] = ''; // Reset each field
      return acc;
    }, {} as FormData);

    setFormData(resetData);
    setErrors({});
  };

  const handleAddUser = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      handleReset();
    }
  };

  const promptField = fields.find(field => field.name === 'prompt');

  return (
    <div className="font-f1 mx-auto mt-16 max-w-7xl p-4 md:mt-16 md:p-6">
      {isSuccess && (
        <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
          <AlertDescription className="text-green-700 dark:text-green-300">
            {text.userAddedSuccess || 'User added successfully!'}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:order-2 lg:w-1/2">
          {/* Upload Files Section on Top */}
          <h2 className="text-light-text-primary dark:text-dark-text-primary mb-2 flex flex-row text-base font-medium">
            <Upload className="mr-2 h-5 w-5" />
            {text.uploadFiles || 'Upload Files'}
          </h2>
          <div className="border-light-muted/30 dark:border-dark-muted/30 rounded-lg border p-4 md:p-6">
            <FileUploader isFileUploaded={value => setIsFileUploaded(value)} />
          </div>

          {/*Prompt and buttons */}
          {!isFileUploaded && !isSmallScreen && !isMidScreen && (
            <div>
              <div className="col-span-full mt-4">
                <label className="text-light-text-primary dark:text-dark-text-primary mb-2 block font-medium">
                  <span className="flex items-center gap-2">
                    {promptField?.icon}
                    {promptField?.label}
                  </span>
                </label>
                <textarea
                  name={promptField?.name}
                  value={formData.prompt}
                  onChange={e => handleInputChange(e)}
                  className={`dark:bg-dark-background bg-light-background scrollbar-hide dark:text-dark-text-primary min-h-[128px] w-full rounded-lg border px-4 py-3 outline-none focus:ring-1 ${
                    errors[promptField?.name as keyof FormErrors]
                      ? 'border-red-300 focus:ring-red-500 dark:border-red-700'
                      : 'border-light-muted/30 dark:border-dark-muted/30 focus:ring-light-primary dark:focus:ring-dark-primary'
                  }`}
                  placeholder={promptField?.placeholder}
                />
                {errors[promptField?.name as keyof FormErrors] && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors[promptField?.name as keyof FormErrors]}
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-end md:justify-between">
                <button
                  type="button"
                  className="text-light-text-primary dark:text-dark-text-primary border-light-muted/30 dark:border-dark-muted/30 hover:bg-light-muted/10 dark:hover:bg-dark-muted/10 w-full rounded-lg border px-4 py-2 sm:w-auto"
                  onClick={handleReset}
                >
                  <span className="flex items-center justify-center">
                    <X className="mr-2 h-4 w-4" />
                    {text.cancel || 'Cancel'}
                  </span>
                </button>

                <button
                  onClick={handleAddUser}
                  className="bg-light-primary dark:bg-dark-primary hover:bg-light-accentPrimary dark:hover:bg-dark-accentPrimary w-full rounded-lg px-4 py-2 text-white sm:w-auto"
                >
                  <span className="flex items-center justify-center">
                    <Plus className="mr-2 h-4 w-4" />
                    {text.addUser || 'Add User'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="w-full lg:order-1 lg:w-1/2">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {fields
                .filter(filed => filed !== promptField)
                .map(({ name, label, placeholder, icon }) => (
                  <div key={name}>
                    <label className="text-light-text-primary dark:text-dark-text-primary mb-2 block font-medium">
                      <span className="flex items-center gap-2">
                        {icon}
                        {label}
                      </span>
                    </label>
                    <input
                      type="text"
                      name={name}
                      value={formData[name as keyof FormData]}
                      onChange={e => handleInputChange(e)}
                      className={`dark:bg-dark-background bg-light-background dark:text-dark-text-primary w-full rounded-lg border px-4 py-3 outline-none focus:ring-1 ${
                        errors[name as keyof FormErrors]
                          ? 'border-red-300 focus:ring-red-500 dark:border-red-700'
                          : 'border-light-muted/30 dark:border-dark-muted/30 focus:ring-light-primary dark:focus:ring-dark-primary'
                      }`}
                      placeholder={placeholder}
                    />
                    {errors[name as keyof FormErrors] && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[name as keyof FormErrors]}</p>
                    )}
                  </div>
                ))}
            </div>
          </form>

          {/*Prompt and buttons */}
          {(isFileUploaded || isSmallScreen || isMidScreen) && (
            <div>
              <div className="col-span-full mt-4">
                <label className="text-light-text-primary dark:text-dark-text-primary mb-2 block font-medium">
                  <span className="flex items-center gap-2">
                    {promptField?.icon}
                    {promptField?.label}
                  </span>
                </label>
                <textarea
                  name={promptField?.name}
                  value={formData.prompt}
                  onChange={e => handleInputChange(e)}
                  className={`dark:bg-dark-background bg-light-background scrollbar-hide dark:text-dark-text-primary min-h-[128px] w-full rounded-lg border px-4 py-3 outline-none focus:ring-1 ${
                    errors[promptField?.name as keyof FormErrors]
                      ? 'border-red-300 focus:ring-red-500 dark:border-red-700'
                      : 'border-light-muted/30 dark:border-dark-muted/30 focus:ring-light-primary dark:focus:ring-dark-primary'
                  }`}
                  placeholder={promptField?.placeholder}
                />
                {errors[promptField?.name as keyof FormErrors] && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors[promptField?.name as keyof FormErrors]}
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-end md:justify-between">
                <button
                  type="button"
                  className="text-light-text-primary dark:text-dark-text-primary border-light-muted/30 dark:border-dark-muted/30 hover:bg-light-muted/10 dark:hover:bg-dark-muted/10 w-full rounded-lg border px-4 py-2 sm:w-auto"
                  onClick={handleReset}
                >
                  <span className="flex items-center justify-center">
                    <X className="mr-2 h-4 w-4" />
                    {text.cancel || 'Cancel'}
                  </span>
                </button>

                <button
                  onClick={handleAddUser}
                  className="bg-light-primary dark:bg-dark-primary hover:bg-light-accentPrimary dark:hover:bg-dark-accentPrimary w-full rounded-lg px-4 py-2 text-white sm:w-auto"
                >
                  <span className="flex items-center justify-center">
                    <Plus className="mr-2 h-4 w-4" />
                    {text.addUser || 'Add User'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUser;
