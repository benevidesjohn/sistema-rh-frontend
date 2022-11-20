import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.css';
import { ROUTES } from '../../routes/paths'

import Button from '../../components/button'
import CustomSlider from '../slider';
import ButtonIcon from '../button-icon';
import * as MdIcon from 'react-icons/md';

const ItemVaga = ({ job, isClosed = false, showAllDetails = true }) => {

  const navigate = useNavigate();

  const [showRequisites, setShowRequisites] = useState(!showAllDetails);

  const toggleRequisites = () => {
    setShowRequisites(!showRequisites);
  }

  const showJobCandidates = () => {
    localStorage.setItem("currentJob", JSON.stringify(job));
    navigate(ROUTES.JOB_CANDIDATES);
  }

  return (
    <li className='content-job'>
      <div className="content-job-detail">

        {!showAllDetails &&
          <h3 className='subtitle-register-confirm'>
            Informações gerais
          </h3>
        }
        <div className={`card ${!showAllDetails && 'extra-space'}`}>
          <div className="area-title-description">
            <h1 className='component-title'>{job.title}</h1>
            <h3 className='description-font description-job'>{job.description}</h3>
            {showAllDetails && <div className='opening-date-job'>
              <h3 className="description-font-green">Data de Abertura: </h3>
              <h3 className="description-bold" >
                {new Date(job.createdAt).toLocaleDateString('pt-BR', {
                  dateStyle: 'full'
                })}
              </h3>
            </div>}
          </div>

          {showAllDetails && <div className='area-status'>
            <div className={`content-status status-${isClosed ? "close" : "open"}`}>
              <h1 className="description-font-green">{isClosed ? 'Fechado' : 'Aberto'}</h1>
            </div>
          </div>}

        </div>

        {showAllDetails && <ButtonIcon
          title={`${showRequisites ? "Esconder" : "Exibir"} Requisitos`}
          onClick={toggleRequisites}
          trailing={showRequisites ? <MdIcon.MdArrowDropUp /> : <MdIcon.MdArrowDropDown />}
        />}

        {!showAllDetails && <h3 className='subtitle-register-confirm'>Requisitos</h3>}
        {showRequisites && <CustomSlider values={job.requisites} />}

      </div>

      {showAllDetails && <div className="area-candidates">
        <h1 className='title component-title'>Candidatos</h1>
        <h1 className='description-bold candidates-count'>5</h1>
        <Button
          label='Visualizar Candidatos'
          event={showJobCandidates}
        />
      </div>}

    </li>
  );
}

export default ItemVaga;