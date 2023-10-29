import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../common/inputs/Input';
import { InputData } from '../../common/inputs/types/input.interface';
import logo from '../../../assets/images/logo/logo_black.png';

const Login = () => {

    const useFormMethod = useForm();
    const navigate = useNavigate();

    const idData: InputData = {
        id: "userId",
        name: "userId",
        type: "text",
        labelName: "아이디",
        isRequired: false,
        isDisabled: false,
        placeholder: "아이디를 입력해주세요."
    }

    const passwordData: InputData = {
        id: "userPassword",
        name: "userPassword",
        type: "password",
        labelName: "비밀번호",
        isRequired: false,
        isDisabled: false,
        placeholder: "비밀번호를 입력해주세요."
    }

    const onSubmit = () => {};
    const onError = () => {};

    return (
        <div className="formArea">
            <img src={logo} alt="" />
            <div className="formInformation">
                <FormProvider {...useFormMethod}>
                    <form onSubmit={useFormMethod.handleSubmit(onSubmit, onError)}>
                        <Input data={idData}/>
                        <Input data={passwordData}/>
                        <div className="roundButtonArea active">
                            <button type='submit'>로그인</button>
                        </div>
                        <div className="roundButtonArea">
                            <button type='button' onClick={() => navigate("/auth/terms")}>회원가입</button>
                        </div>
                    </form>
                </FormProvider>
            </div>
            <div className="footerButtonArea">
                <button onClick={() => navigate("/auth/find_id")}>아이디 찾기</button>
                <button onClick={() => navigate("/auth/find_password")}>비밀번호 찾기</button>
            </div>
        </div>
    );
};

export default Login;