"use client";

import { authService } from "@services/authService";
import styles from "@share/components/Header/styles.module.css";
import Button from "@share/ui/Button/Button";
import { handlePromiseError } from "@share/helpers/handlePromiesError";
import { useRouter } from "next/navigation";
import UserIconButton from "@share/ui/UserIconButton/UserIconButton";
import { parseJwt } from "@share/helpers/parseJwt";
import { addComposePostBoard, addMeBoard } from "@store/features/boardsSlice/boardSlice";
import BoardId from "@app/feed/classes/BoardId";
import { useAppDispatch } from "@store/hooks";
import RoundIconButton from "@share/ui/RoundIconButton/RoundIconButton";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { useEffect, useState } from "react";
import { JwtAccess } from "@share/interfaces/JwtAccess";

type Props = {
  pageName: string;
  centerChild?: JSX.Element;
};

export default function Header({ pageName, centerChild }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [jwtAccess, setJwtAccess] = useState<JwtAccess | undefined>();

  useEffect(() => {
    setJwtAccess(parseJwt(localStorage.getItem("access_token")!));
  }, []);

  const signOut = async () => {
    handlePromiseError(authService.signout, [], (response) => {
      if (response.status === 200) router.push("/signin");
    });
  };

  const handlePostWriteClick = () => {
    if (jwtAccess) dispatch(addComposePostBoard({ id: BoardId.id, props: { name: jwtAccess.name } }));
  };

  const handleUserClick = () => {
    if (jwtAccess) dispatch(addMeBoard({ id: BoardId.id, props: { name: jwtAccess.name } }));
  };

  if (!jwtAccess) return null;

  return (
    <header role='banner' className={`${styles.container} ${styles.shadow}`}>
      <div className={styles.left}>
        <h2>{pageName}</h2>
      </div>
      <div className={styles.center}>{centerChild}</div>
      <div className={styles.right}>
        <RoundIconButton icon={faPenToSquare} onClick={handlePostWriteClick} />
        <UserIconButton name={jwtAccess.name} onClick={handleUserClick} />
        <Button text='Sign out' border={true} onClick={signOut} />
      </div>
    </header>
  );
}
