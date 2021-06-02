import Avatar from 'react-avatar';


export default function MemberAvatar({ member }) {
    // const isImg = member?.imgUrl;
    return (
        <div>
            {/* {isImg &&
                < Avatar  src={member.imgUrl}  round={true} size={30}/>
            } */}
            {/* {!isImg && */}
                < Avatar color={'#172b4d'} /* src={member.imgUrl} */ name={member.fullname.charAt(0)} round={true} size={30}/>
            {/* } */}

        </div>
    )
}