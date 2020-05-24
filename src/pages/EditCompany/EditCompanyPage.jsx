import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { APP_NAME, ADMINISTRATIVE_PATH } from '../../constants';
import { Row, Column, Caption } from '../../components/CommonStyles/CommonStyles';
import { CompanyActions } from '../../store/ducks/company';

const EditCompanyPage = () => {
  const dispatch = useDispatch();
  const { getCompany, saveCompany, saveSocialMedia } = CompanyActions;

  const [name, setName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [pageUrl, setPageUrl] = useState('');

  const [instagramUrl, setInstagramUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');

  useEffect(() => {
    dispatch(getCompany());
  }, []);

  const {
    name: nameStored,
    instagramUrl: instagramUrlStored,
    facebookUrl: facebookUrlStore,
    whatsappNumber: whatsappNumberStored,
    pageUrl: pageUrlStored,
  } = useSelector(({ company }) => company);

  useEffect(() => {
    setName(nameStored ?? '');
    setWhatsappNumber(whatsappNumberStored ?? '');
    setInstagramUrl(instagramUrlStored ?? '');
    setFacebookUrl(facebookUrlStore ?? '');
    setPageUrl(pageUrlStored ?? '');
  }, [nameStored, instagramUrlStored, facebookUrlStore, whatsappNumberStored, pageUrlStored]);

  const isCompanyCreated = () => Boolean(nameStored);

  const isInputsValid = () => {
    // TODO: do some validation here...
    return true;
  };

  const handleSaveBasicInfo = () => {
    if (isInputsValid()) {
      dispatch(saveCompany(name, whatsappNumber, pageUrl));
    } else {
      // TODO: show some error on invalid input...
    }
  };

  const handleSaveSocialMedia = () => {
    if (isInputsValid()) {
      dispatch(saveSocialMedia(instagramUrl, facebookUrl));
    } else {
      // TODO: show some error on invalid input...
    }
  };

  const handleExitEditing = () => {
    handleSaveBasicInfo();
    handleSaveSocialMedia();
    dispatch(push(ADMINISTRATIVE_PATH));
  };

  return (
    <>
      <h2>Estabelecimento</h2>

      <h4>Informações básicas</h4>
      {/* <Row> // TODO: image input
        <input
          type="text"
          placeholder="Logo"
        />
        <button type="button">Carregar imagem (WIP)</button>
      </Row> */}
      <Row>
        <Column width="100%">
          <input
            type="text"
            placeholder="Nome do estabelecimento"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
          <Caption>Este nome aparecerá para seu cliente na lojinha</Caption>
        </Column>
      </Row>
      <Row>
        <input
          type="text"
          placeholder="Número do Whatsapp"
          value={whatsappNumber}
          onChange={({ target: { value } }) => setWhatsappNumber(value)}
        />
      </Row>
      <Row>
        {APP_NAME?.toLowerCase()}.com.br/
        <input
          type="text"
          placeholder="URL da lojinha"
          value={pageUrl}
          onChange={({ target: { value } }) => setPageUrl(value)}
        />
      </Row>
      <button type="button">Copiar link</button>
      <br />
      <br />
      <button type="button" onClick={handleSaveBasicInfo}>
        Salvar
      </button>

      {!isCompanyCreated() && (
        <>
          <br />
          <br />
          <br />
          <Caption>Cadastre as informações básicas para continuar</Caption>
        </>
      )}

      <h4>Redes sociais</h4>
      <Row>
        <input
          type="text"
          placeholder="Facebook"
          value={facebookUrl}
          onChange={({ target: { value } }) => setFacebookUrl(value)}
          disabled={!isCompanyCreated()}
        />
      </Row>
      <Row>
        <input
          type="text"
          placeholder="Instagram"
          value={instagramUrl}
          onChange={({ target: { value } }) => setInstagramUrl(value)}
          disabled={!isCompanyCreated()}
        />
      </Row>
      <button type="button" disabled={!isCompanyCreated()} onClick={handleSaveSocialMedia}>
        Salvar
      </button>

      <br />
      <br />
      <br />
      <button type="button" disabled={!isCompanyCreated()} onClick={handleExitEditing}>
        Concluir
      </button>
    </>
  );
};

export default EditCompanyPage;
