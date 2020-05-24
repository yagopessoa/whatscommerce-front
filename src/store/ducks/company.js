import { createActions, createReducer } from 'reduxsauce';

export const { Types: CompanyTypes, Creators: CompanyActions } = createActions({
  getCompany: [],
  updateCompany: [
    'name',
    'logo',
    'instagramUrl',
    'facebookUrl',
    'openingHours',
    'whatsappNumber',
    'pageUrl',
    'createdAt',
    'updatedAt',
  ],
  clearCompany: [],
  saveCompany: ['name', 'whatsappNumber', 'pageUrl'],
  saveSocialMedia: ['instagramUrl', 'facebookUrl'],
});

const INITIAL_STATE = {
  name: null,
  logo: null,
  instagramUrl: null,
  facebookUrl: null,
  openingHours: null,
  whatsappNumber: null,
  pageUrl: null,
  createdAt: null,
  updatedAt: null,
};

const updateCompany = (_, companyInfo) => ({ ...companyInfo });

const clearCompany = () => ({
  name: null,
  logo: null,
  instagramUrl: null,
  facebookUrl: null,
  openingHours: null,
  whatsappNumber: null,
  pageUrl: null,
  createdAt: null,
  updatedAt: null,
});

export default createReducer(INITIAL_STATE, {
  [CompanyTypes.UPDATE_COMPANY]: updateCompany,
  [CompanyTypes.CLEAR_COMPANY]: clearCompany,
});
