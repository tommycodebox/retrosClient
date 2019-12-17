import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import PropTypes from 'prop-types';
import {
  create,
  chooseType,
  updateConnected,
  updateStart,
  resetNew
} from '../../actions/retro';
import openSocket from 'socket.io-client';
import { setAlert } from '../../actions/alert';
import FieldsCard from '../partials/FieldsCard';
import MainCard from '../partials/MainCard';
import Modal from '../partials/Modal';

const NewRetro = ({
  auth,
  setAlert,
  newRetro: { isChosen, people, connected, start, completed },
  create,
  updateConnected,
  updateStart,
  chooseType,
  history
}) => {
  const [retro, setRetro] = useState({
    name: '',
    type: '',
    todos: [''],
    awesomes: [''],
    deltas: ['']
  });

  const [peopleCount, setPeopleCount] = useState('');

  const [socket, setSocket] = useState();

  useEffect(() => {
    const io = openSocket('https://retros-api.innergang.com');
    setSocket(io);

    if (auth.user) {
      io.on('connect', () => {
        io.emit('mob', { mob: auth.user.mob });
      });
      io.on(auth.user.mob, msg => {
        setRetro(msg);
        const inputs = document.querySelectorAll('input');
        inputs.forEach(
          input => input.value.length > 0 && input.classList.add('filled')
        );
      });
    }

    io.on('started', msg => {
      updateStart();
    });

    return () => {
      auth.user && io.off(auth.user.mob);
      io.close();
      socket && socket.close();
    };
  }, [auth.user]);

  useEffect(() => {
    if (auth.user && socket) {
      socket.on(auth.user.mob + '/mob', msg => {
        start && socket.emit('start', true);
        updater();
      });
      socket.on(auth.user.mob + '/completed', msg => {
        setAlert('Retro created', 'success');
        history.push('/');
      });
      if (completed) {
        socket.emit('completed', { mob: auth.user.mob });
      }
    }
    return () => {
      if (auth.user && socket) {
        socket.off(auth.user.mob + '/mob');
        socket.off(auth.user.mob + '/completed');
      }
    };
  }, [auth.user, connected, socket, start, completed]);

  const updater = () => {
    updateConnected();
    if (connected + 1 === people) {
      console.log(connected, people);
      updateStart();
      socket.emit('start', true);
    }
  };

  const send = msg => {
    msg.mob = auth.user.mob;
    socket && socket.emit('msg', msg);
  };

  const typer = (e, num, type) => {
    if (e.target.value.length > 0) {
      e.target.classList.add('filled');
    } else {
      e.target.classList.remove('filled');
    }
    const updated = [...retro[type]];
    updated[num] = e.target.value;
    setRetro({ ...retro, [type]: updated });
    send({ ...retro, [type]: updated });
  };

  const addField = type => {
    const newField = '';
    const updated = [...retro[type]];
    updated.push(newField);
    setRetro({ ...retro, [type]: updated });
    send({ ...retro, [type]: updated });
  };

  const deleteField = (type, num) => {
    let updated = [...retro[type]];
    updated = updated.filter((_item, index) => index !== num);
    setRetro({ ...retro, [type]: updated });
    send({ ...retro, [type]: updated });
  };

  const inputHandler = e => {
    if (e.target.value.length > 0) {
      e.target.classList.add('filled');
    } else {
      e.target.classList.remove('filled');
    }
    setRetro({ ...retro, [e.target.name]: e.target.value });
    send({ ...retro, [e.target.name]: e.target.value });
  };

  const submitRetro = () => {
    create(retro, history);
  };

  const setupMultiple = e => {
    const multiple = document.querySelector('.multiple');
    multiple.classList.add('active');
    e.target.classList.add('active');
    e.target.textContent = 'How many people?';
  };

  const choose = retro => {
    chooseType(retro);
  };

  const peopleTyper = e => {
    if ((e.target.value < 6 && e.target.value > 2) || e.target.value === '') {
      setPeopleCount(e.target.value);
    }
  };

  return (
    <div className='New'>
      {/* Modal */}
      {!start && (
        <Modal
          isChosen={isChosen}
          connected={connected}
          people={people}
          choose={choose}
          setupMultiple={setupMultiple}
          peopleCount={peopleCount}
          peopleTyper={peopleTyper}
        />
      )}
      <Sidebar />
      <div className='Main'>
        <Header title='New retro' page='New' auth={auth} create={submitRetro} />
        <section className='board'>
          <MainCard retro={retro} inputHandler={inputHandler} />
          <FieldsCard
            title='Todos'
            label='Todo'
            type='todos'
            typ='todo'
            retro={retro}
            addField={addField}
            deleteField={deleteField}
            typer={typer}
          />
          <FieldsCard
            title='Awesomes'
            label='Awesome'
            type='awesomes'
            typ='awesome'
            retro={retro}
            addField={addField}
            deleteField={deleteField}
            typer={typer}
          />
          <FieldsCard
            title='Deltas'
            label='Delta'
            type='deltas'
            typ='delta'
            retro={retro}
            addField={addField}
            deleteField={deleteField}
            typer={typer}
          />
        </section>
      </div>
    </div>
  );
};

NewRetro.propTypes = {
  auth: PropTypes.object.isRequired,
  newRetro: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  updateStart: PropTypes.func.isRequired,
  updateConnected: PropTypes.func.isRequired,
  resetNew: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  chooseType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  newRetro: state.retro.new
});

export default connect(mapStateToProps, {
  create,
  chooseType,
  updateConnected,
  updateStart,
  resetNew,
  setAlert
})(withRouter(NewRetro));
