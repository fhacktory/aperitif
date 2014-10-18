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

        $data = array();
        foreach ($aperitifs as $aperitif) {
            $data[] = array(
                'created' => $aperitif->getCreated(),
                'publicId' => $aperitif->getPublicId(),
                'username' => $aperitif->getUsername(),
                'location' => $aperitif->getLocation(),
            );
        }

        $view = $this->view($data, 200);

        return $this->handleView($view);
    }

    public function createAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $username = $request->request->get('username', null);
        $location = $request->request->get('location', 'not provided');

        if ($username !== null) {
            $aperitif = new Aperitif($username, $location);
            $em->persist($aperitif);
            $em->flush();
            $data = array(
                'created' => $aperitif->getCreated(),
                'id' => $aperitif->getId(),
            );
            $view = $this->view($data, 200);
        } else {
            $data = array('msg' => "Username can't be null.");
            $view = $this->view($data, 400);
        }

        return $this->handleView($view);
    }

    public function attendeeAction(Request $request, $id, $action)
    {
        $em = $this->getDoctrine()->getManager();

        $aperitif = $em->getRepository('FestonAperitifBundle:Aperitif')->find($id);
        if (!$aperitif) {
            $data = array('msg' => "Aperitif not found.");
            $view = $this->view($data, 404);

            return $this->handleView($view);
        }

        $userId = $request->request->get('id', null);
        $user = $em->getRepository('FestonAperitifBundle:User')->find($userId);
        if (!$user) {
            $data = array('msg' => "User not found.");
            $view = $this->view($data, 404);

            return $this->handleView($view);
        }

        $action = $request->request->get('action', null);
        $authorizedActions = array('add', 'remove');
        if ($action == null || !in_array($action, $authorizedActions)) {
            $data = array('msg' => "Wrong action.");
            $view = $this->view($data, 400);

            return $this->handleView($view);
        }

        if ($action == 'add') {
            $aperitif->addAttendee($user);
            $em->flush();

            $data = array('msg' => "User now attend this event.");
            $view = $this->view($data, 200);

            return $this->handleView($view);
        }
    }
}
