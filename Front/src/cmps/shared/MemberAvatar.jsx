import Avatar from 'react-avatar';


export default function MemberAvatar({ member }) {
    const isImg = member?.imgUrl;
    console.log(isImg);
    return (
        <div>
            {isImg &&
                < Avatar src={member.imgUrl} className="member-avatar" round={true} size={30} />
            }
            {!isImg &&
                < Avatar
                    color={'#0079bf'}
                    // src={member.imgUrl}
                    className="member-avatar"
                    name={member.fullname.charAt(0)}
                    round={true}
                    size={30}
                />
            }

        </div>
    )
}

