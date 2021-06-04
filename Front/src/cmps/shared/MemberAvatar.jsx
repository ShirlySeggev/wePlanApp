import Avatar from 'react-avatar';


export default function MemberAvatar({ member }) {
    console.log(member);
    if(!member) return <h1>maaaaa?????</h1>;
    const isImg = member?.imgUrl;
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

