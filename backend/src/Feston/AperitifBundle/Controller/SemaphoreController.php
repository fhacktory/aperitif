<?php

namespace Feston\AperitifBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Feston\AperitifBundle\Entity\Semaphore;

class SemaphoreController extends FOSRestController
{
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();
        $semaphores = $em->getRepository('FestonAperitifBundle:Semaphore')->findAll();

        $data = array();
        foreach ($semaphores as $semaphore) {
            $data[] = array(
                'created' => $semaphore->getCreated(),
                'publicId' => $semaphore->getPublicId(),
                'username' => $semaphore->getUsername(),
                'location' => $semaphore->getLocation(),
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
            $semaphore = new Semaphore($username, $location);
            $em->persist($semaphore);
            $em->flush();
            $data = array(
                'created' => $semaphore->getCreated(),
                'privateId' => $semaphore->getPrivateId(),
                'publicId' => $semaphore->getPublicId(),
            );
            $view = $this->view($data, 200);
        } else {
            $data = array('msg' => "Username can't be null.");
            $view = $this->view($data, 400);
        }

        return $this->handleView($view);
    }

    public function updateAction(Request $request, $publicId)
    {
        $em = $this->getDoctrine()->getManager();
        $semaphore = $em->getRepository('FestonAperitifBundle:Semaphore')->findOneByPublicId($publicId);

        if (!$semaphore) {
            $data = array('msg' => "Can't find this semaphore.");
            $view = $this->view($data, 404);

            return $this->handleView($view);
        }

        $privateId = $request->request->get('privateId', null);
        if ($privateId === null || $privateId !== $semaphore->getPrivateId()) {
            $data = array('msg' => "You don't have the right to update this semaphore.");
            $view = $this->view($data, 403);
        } else {
            $location = $request->request->get('location', 'not provided');
            $semaphore->setLocation($location);
            $em->flush();
            $data = array('msg' => "Semaphore updated.");
            $view = $this->view($data, 200);
        }

        return $this->handleView($view);
    }
}
