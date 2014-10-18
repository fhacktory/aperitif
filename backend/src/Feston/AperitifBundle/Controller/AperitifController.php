<?php

namespace Feston\AperitifBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Feston\AperitifBundle\Entity\Aperitif;

class AperitifController extends FOSRestController
{
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();
        $aperitifs = $em->getRepository('FestonAperitifBundle:Aperitif')->findAll();

        $view = $this->view($aperitifs, 200);

        return $this->handleView($view);
    }

    public function createAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $userId = $request->request->get('userId', null);
        $location = $request->request->get('location', null);
        $message = $request->request->get('message', null);

        $user = $em->getRepository('FestonAperitifBundle:User')->find($userId);
        if (!$user) {
            $data = array('msg' => "User not found.");
            $view = $this->view($data, 404);

            return $this->handleView($view);
        }

        if ($location !== null) {
            $aperitif = new Aperitif($location);
            $aperitif->addAttendee($user);
            $aperitif->setMessage($message);
            $em->persist($aperitif);
            $em->flush();
            $data = array(
                'id' => $aperitif->getId(),
                'created' => $aperitif->getCreated(),
            );
            $view = $this->view($data, 200);
        } else {
            $data = array('msg' => "Username can't be null.");
            $view = $this->view($data, 400);
        }

        return $this->handleView($view);
    }

    public function manageAttendeeAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $aperitif = $em->getRepository('FestonAperitifBundle:Aperitif')->find($id);
        if (!$aperitif) {
            $data = array('msg' => "Aperitif not found.");
            $view = $this->view($data, 404);

            return $this->handleView($view);
        }

        $userId = $request->request->get('userId', null);
        $user = $em->getRepository('FestonAperitifBundle:User')->find($userId);
        if (!$user) {
            $data = array('msg' => "User not found.");
            $view = $this->view($data, 404);

            return $this->handleView($view);
        }

        $action = $request->request->get('action', null);
        $authorizedActions = array('add', 'remove');
        if (!in_array($action, $authorizedActions)) {
            $data = array('msg' => "Wrong action.");
            $view = $this->view($data, 400);

            return $this->handleView($view);
        }

        if ($action == 'add') {
            $aperitif->addAttendee($user);
            $em->flush();
            $data = array('msg' => "User now attends this event.");
        } elseif ($action == 'remove') {
            $aperitif->removeAttendee($user);
            $em->flush();
            $data = array('msg' => "User now doesn't attend this event.");
        }
        $view = $this->view($data, 200);

        return $this->handleView($view);
    }
}
