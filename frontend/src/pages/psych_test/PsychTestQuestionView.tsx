import {PsychOptions, PsychQuestion} from "../../controller/PsychTestController";
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {CheckBoxCallback, CheckboxGroup, CheckboxGroupRef, CheckboxOption} from "../../common/view/input/CheckBox";
import {RadioGroup, RadioGroupCallback, RadioGroupRef} from "../../common/view/input/Radio";


export interface PsychTestQuestionViewProps {
    question:PsychQuestion|undefined;
    onChange?: (value: string[]) => void;
    style?:React.CSSProperties | undefined
}

export interface PsychTestQuestionViewRef {
    validate: () => boolean;
}


export const PsychTestQuestionView=forwardRef<PsychTestQuestionViewRef,PsychTestQuestionViewProps>((props, ref) => {
const {question,onChange,style}=props;

    const checkBoxRef = useRef<CheckboxGroupRef>(null);
    const radioRef = useRef<RadioGroupRef>(null);
    const [answer, setAnswer] = useState<string[]>();

    useImperativeHandle(ref, () => ({
        validate:():boolean=>{
            const isCheckBoxValid=checkBoxRef.current?.validate();
            const isRadioValid=radioRef.current?.validate()
            if(isCheckBoxValid!==undefined){
                return isCheckBoxValid;
            }
            if(isRadioValid!==undefined){
                return isRadioValid;
            }
            return false;
        }
    }));

    const getOptions = question?.options.map(
        (value0: PsychOptions): CheckboxOption => ({label: value0.key + ":" + value0.text, value: "" + value0.key}));

    const handleValueArrayChangeCheckBox = (value: string[]) => {
        if (value == null || value.length === 0) {
            setAnswer([]);
            onChange?.([]);
        } else {
            setAnswer(value);
            onChange?.(value);
        }

    }

    const handleValueArrayChangeRadio = (value: string) => {
        if (value == null || value.length === 0) {
            setAnswer([]);
            onChange?.([]);
        } else {
            setAnswer([value]);
            onChange?.([value]);
        }
    }

    return (<div style={style}>
            <div className="layout-flex-row">
                <p className="psych-test-question-key">{question?.title}:</p>
                <p>{question?.content}</p>
            </div>
            {question?.multiOptional ?
                <CheckboxGroup
                    style={{marginTop:"10px"}}
                    ref={checkBoxRef}
                    options={getOptions ? getOptions : []}
                    onChange={handleValueArrayChangeCheckBox}
                    value={answer}
                    required
                /> :
                <RadioGroup
                    style={{marginTop:"10px"}}
                    ref={radioRef}
                    options={getOptions ? getOptions : []} layout="vertical"
                    onChange={handleValueArrayChangeRadio}
                    value={answer?.at(0)}
                    required
                />}
            <span style={{flexGrow: 1}}></span>
        </div>
    )
});