import React from 'react'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import "yup-phone-lite";
import './LoginForm.scss';

const LoginForm = ({handleNext}) => {

    const schema = yup.object().shape({
        name: yup.string().required('Ime je neophodno'),
            phone: yup.string().phone('RS', "Molimo vas da unesete postojeći broj telefona").required("Broj telefona je neophodan"),
        email: yup.string().email('Molimo vas da unesete ispravan e-mail').required('E-mail je neophodan'),
        termsOfService: yup.bool().oneOf([true], 'Molimo vas da prihvatite uslove korišćenja')
        })
    
        const {
            register,
            handleSubmit,
            formState: {errors},
        } = useForm({
            resolver: yupResolver(schema),
            defaultValues: {
          name:'',
                phone: '',
          email: '',
          termsOfService: false
            }
        })
    
      const saveDataAndNavigate = (userData) => {
        console.log(userData)
        handleNext();
      }

  return (
    <>
           {/* <img
              className='logo'
              src={ArenaLogo}
              style={{ width: 170 }}
              alt="website logo"
            /> */}
            <label htmlFor="name">Ime i prezime</label>
            <input 
              className='arenaInput' 
              name='name' 
              type="text" 
              placeholder='Petar Petrovic'
              {...register('name')}
              required
            />
            {errors.name && <h5 className='errorMessage'>{errors.name.message}</h5>}
            <label htmlFor="name">Broj telefona</label>
            <input 
              className='arenaInput' 
              name='phoneNumber' 
              type="phoneNumber" 
              placeholder='661234567'
              {...register('phone')}
              required
            />
            {errors.phone && <h5 className='errorMessage'>{errors.phone.message}</h5>}
            <label htmlFor="name">E-mail</label>
            <input 
              className='arenaInput' 
              name='email' 
              type="email" 
              placeholder='perapetrovic@example.com'
              {...register('email')}
              required
            />
            {errors.email && <h5 className='errorMessage'>{errors.email.message}</h5>}
            <div className="checkboxContainer">
              <input 
                type="checkbox" 
                name='termsOfService' 
                className='checkbox' 
                {...register('termsOfService')}
                required  
              />
              <label htmlFor="termsOfService">Slažem se sa <a>uslovima korišćenja</a> i punoljetan sam.</label>
            </div>
            {errors.termsOfService && <h5 className='errorMessage'>{errors.termsOfService.message}</h5>}
            <button onClick={handleSubmit(saveDataAndNavigate)} className='startButton'>Start</button>
    </>
  )
}

export default LoginForm