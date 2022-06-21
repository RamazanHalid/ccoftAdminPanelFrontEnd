import { M_cDetail } from "./m_cDetail";

export interface GeneralResponseModel <T>{
    m_cData:T[];
    m_cDetail:M_cDetail

}