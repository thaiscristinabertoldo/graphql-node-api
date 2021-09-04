import { NotificationType } from './Notification';

interface SendNotification {
  fnPublish: (payload: any) => {};
  type: NotificationType;
  id?: String;
}

const getType = (type: NotificationType) => {
  switch (type) {
    case NotificationType.ADD:
      return 'incluir';
    case NotificationType.UPDATE:
      return 'editar';
    case NotificationType.DELETE:
      return 'excluir';
    default:
      return '';
  }
};

export const sendNotification = async ({
  fnPublish,
  type,
  id,
}: SendNotification) => {
  if (id) {
    fnPublish({
      result: {
        type,
        id,
      },
    });
  } else {
    fnPublish({ error: `Falha ao ${getType(type)}` });
  }
};
